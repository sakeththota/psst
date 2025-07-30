'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from "ably/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useRef } from 'react'
import Chat, { Message } from '@/components/chat';
import { randomUUID } from 'crypto';

export default function PubSubClient() {
    const client = new Ably.Realtime ({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

    return (
        <AblyProvider client={ client }>
            <ChannelProvider channelName="dev">
                <Channel />
            </ChannelProvider>
        </AblyProvider>
    )
}

function Channel({clientId}: any) {
    const [messages, setMessages] = useState<Array<Message>>([])

    const { channel } = useChannel("dev", (message: Ably.Message) => {
        setMessages(prev => [...prev, new Message(message.name || 'anon', message.data.text)])
    });
  
    const [messageText, setMessageText] = useState<string>('')

    const publicFromClientHandler = (e) => {
        e.preventDefault()
        if(channel === null) return
        channel.publish('dev', {text: messageText})
        setMessageText('')
    }

    const handleInputChange = (e: any) => {
        setMessageText(e.target.value)
    }

    return (
        <div className="h-full min-h-0 w-full max-w-4xl flex flex-col my-32 p-4 gap-4 border-2 border-foreground rounded-md">
            <div className="flex-1 min-h-0">
                <Chat messages={messages}  />
            </div>
            <form onSubmit={publicFromClientHandler} className="w-full flex flex-row gap-2">
                <Input value={messageText} onChange={handleInputChange} className="focus-visible:ring-0 focus-visible:outline-none focus-visible:border-neutral-300 flex-1" />
                <Button type="submit">Send</Button>
            </form>
        </div>
    )
}