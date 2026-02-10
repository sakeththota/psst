'use client'

import { usePresence, usePresenceListener } from 'ably/react'
import { useEffect, useMemo, useRef } from 'react'

interface PresenceData {
  username: string
}

interface UseChannelPresenceProps {
  channelName: string
  username: string
  onMemberJoin?: (username: string) => void
  onMemberLeave?: (username: string) => void
}

export function useChannelPresence({
  channelName,
  username,
  onMemberJoin,
  onMemberLeave,
}: UseChannelPresenceProps) {
  const onMemberJoinRef = useRef(onMemberJoin)
  onMemberJoinRef.current = onMemberJoin
  const onMemberLeaveRef = useRef(onMemberLeave)
  onMemberLeaveRef.current = onMemberLeave

  // Enter presence on mount, leave on unmount
  usePresence<PresenceData>(channelName, { username })

  // Get the full member list (updates on every presence change)
  const { presenceData } = usePresenceListener<PresenceData>(channelName)

  // Deduplicate members by username for display
  const presentMembers = useMemo(() => {
    const seen = new Set<string>()
    return presenceData
      .map((msg) => ({
        clientId: msg.clientId,
        username: msg.data?.username ?? 'unknown',
      }))
      .filter((member) => {
        if (seen.has(member.username)) return false
        seen.add(member.username)
        return true
      })
  }, [presenceData])

  // Build a stable string key from sorted usernames so the effect
  // only fires when the actual set of unique usernames changes
  const usernameKey = useMemo(
    () => presentMembers.map((m) => m.username).sort().join('\0'),
    [presentMembers]
  )

  // Track whether initial sync is done — the first non-empty set
  // is the existing room state, not new joins
  const hasSyncedRef = useRef(false)
  const prevUsernamesRef = useRef<Set<string>>(new Set())

  // Debounce leave notifications to avoid spurious leave/join from
  // tab switching or brief disconnects
  const pendingLeavesRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  useEffect(() => {
    const currentUsernames = new Set(presentMembers.map((m) => m.username))

    if (!hasSyncedRef.current) {
      // Seed with whatever is present on first population
      prevUsernamesRef.current = currentUsernames
      if (currentUsernames.size > 0) {
        hasSyncedRef.current = true
      }
      return
    }

    const prev = prevUsernamesRef.current

    // New members: in current but not in previous
    for (const name of currentUsernames) {
      if (!prev.has(name)) {
        // If there's a pending leave for this user, cancel it (tab switch / reconnect)
        const pendingLeave = pendingLeavesRef.current.get(name)
        if (pendingLeave) {
          clearTimeout(pendingLeave)
          pendingLeavesRef.current.delete(name)
        } else {
          onMemberJoinRef.current?.(name)
        }
      }
    }

    // Left members: in previous but not in current — debounce
    for (const name of prev) {
      if (!currentUsernames.has(name) && !pendingLeavesRef.current.has(name)) {
        const timer = setTimeout(() => {
          pendingLeavesRef.current.delete(name)
          onMemberLeaveRef.current?.(name)
        }, 5000)
        pendingLeavesRef.current.set(name, timer)
      }
    }

    prevUsernamesRef.current = currentUsernames
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameKey])

  // Clean up timers on unmount
  useEffect(() => {
    const pending = pendingLeavesRef.current
    return () => {
      pending.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  return { presentMembers }
}
