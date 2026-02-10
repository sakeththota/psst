'use client'

import { useEffect, useRef, useState } from 'react'

interface UseUnreadProps {
  channelName: string
  messageCount: number
}

export function useUnread({ channelName, messageCount }: UseUnreadProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const isVisibleRef = useRef(true)
  const prevMessageCountRef = useRef(messageCount)
  const baseTitle = `#${channelName} - Psst`

  // Set base title on mount
  useEffect(() => {
    document.title = baseTitle
  }, [baseTitle])

  // Track tab visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = document.visibilityState === 'visible'
      isVisibleRef.current = visible

      if (visible) {
        setUnreadCount(0)
        document.title = baseTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [baseTitle])

  // Track new messages
  useEffect(() => {
    const newMessages = messageCount - prevMessageCountRef.current
    prevMessageCountRef.current = messageCount

    if (newMessages > 0 && !isVisibleRef.current) {
      setUnreadCount((prev) => {
        const next = prev + newMessages
        document.title = `(${next}) ${baseTitle}`
        return next
      })
    }
  }, [messageCount, baseTitle])

  return { unreadCount }
}
