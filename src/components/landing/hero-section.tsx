'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const ROOM_NAME_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function HeroSection() {
  const [username, setUsername] = useState('')
  const [channel, setChannel] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleJoinChannel = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedUsername = username.trim()
    const trimmedChannel = channel.trim().toLowerCase()

    if (!trimmedUsername) return

    if (!trimmedChannel) {
      setError('Room name is required.')
      return
    }

    if (!ROOM_NAME_REGEX.test(trimmedChannel)) {
      setError('Letters, numbers, and hyphens only. No spaces or special characters.')
      return
    }

    router.push(`/${trimmedChannel}?username=${encodeURIComponent(trimmedUsername)}`)
  }

  return (
    <section className="relative w-full min-h-[calc(100dvh-4rem)] flex items-center overflow-hidden py-12 sm:py-16">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(ellipse, white 0%, transparent 70%)',
        }}
      />

      {/* Content - side by side on lg, stacked on mobile */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between gap-12 lg:gap-16">
        {/* Left: Copy */}
        <div className="flex flex-col gap-5 text-center lg:text-left max-w-lg lg:pt-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Ephemeral chat{' '}
            <br className="hidden sm:block" />
            for{' '}
            <span className="text-muted-foreground">everyone</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">
            Whisper. Then vanish.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground/60 leading-relaxed">
            No accounts. No history. No traces. Just open a room, share the name, and start talking.
          </p>
        </div>

        {/* Right: Join Form Card */}
        <Card className="w-full max-w-md lg:min-w-[380px] border-border/50 shrink-0">
          <CardHeader>
            <CardTitle className="text-lg">Join a room</CardTitle>
            <CardDescription>
              Pick a name, choose a room, start talking.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinChannel}>
              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Your name</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="What should we call you?"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="channel">Room</Label>
                  <Input
                    id="channel"
                    type="text"
                    placeholder="Enter a room name"
                    required
                    value={channel}
                    onChange={(e) => {
                      setChannel(e.target.value)
                      if (error) setError('')
                    }}
                    aria-invalid={!!error}
                  />
                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}
                </div>
                <Button type="submit" size="lg" className="w-full mt-1">
                  Join room
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </section>
  )
}
