'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from "ably/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MouseEventHandler, MouseEvent, useState } from 'react'
import Chat, { Message } from '@/components/chat';

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

function Channel() {
    const [messages, setMessages] = useState<Array<Message>>([])

    const { channel } = useChannel("dev", (message: Ably.Message) => {
        setMessages(prev => [...prev, new Message(message.name || 'anon', message.data.text)])
    });
  
    const [messageText, setMessageText] = useState<string>('')

    const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        if(channel === null) return
        channel.publish('devClient', {text: messageText})
    }

    const handleInputChange = (e: any) => {
        setMessageText(e.target.value)
    }

    return (
        <div className="w-full max-w-4xl h-full flex flex-col my-32 border-0 border-black rounded-md p-4 gap-4">
            <div className="flex-1">
                <Chat messages={messages}  />
            </div>
            <div className="w-full flex flex-row gap-2">
                <div className="w-full flex flex-row gap-2">
                <div className="flex-1">
                    <Input onChange={handleInputChange} className="focus-visible:ring-0 focus-visible:outline-none focus-visible:border-neutral-300" />
                </div>
                <Button onClick={publicFromClientHandler}>Send</Button>
            </div>
            </div>
        </div>
    )
}