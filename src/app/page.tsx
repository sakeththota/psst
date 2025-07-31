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
import { Label } from "@/components/ui/label"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [username, setUsername] = useState('')
  const [channel, setChannel] = useState('')
  const router = useRouter()
  
  const handleJoinChannel = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !channel) return
    router.push(`/${channel}?username=${encodeURIComponent(username)}`)
  }

  return (
    <main className="box-border w-dvw h-dvh min-h-0 flex flex-col items-center justify-center">
      <div className="w-2/3 md:w-1/2 lg:w-1/3 h-full flex flex-col justify-center items-center">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Join</CardTitle>
            <CardDescription>Enter a display name and channel to start chatting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinChannel}>
              <div className='flex flex-col gap-6 text-base'>
                <div className='grid gap-2'>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor="channel">Channel</Label>
                  <Input
                    id="channel"
                    type="text"
                    required
                    value={channel}
                    onChange={(e)=> setChannel(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">Join</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}