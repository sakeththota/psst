'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from "ably/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MouseEventHandler, MouseEvent, useState } from 'react'
import Logger, { LogEntry } from '@/components/logger';

export default function PubSubClient() {
    const client = new Ably.Realtime ({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

    return (
        <AblyProvider client={ client }>
            <ChannelProvider channelName="dev">
                <Chat />
            </ChannelProvider>
        </AblyProvider>
    )
}

function Chat() {
    const [logs, setLogs] = useState<Array<LogEntry>>([])

    const { channel } = useChannel("dev", (message: Ably.Message) => {
        setLogs(prev => [...prev, new LogEntry(`${message.name}: ${message.data.text}`)])
    });
  
    const [messageText, setMessageText] = useState<string>('')

    const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        if(channel === null) return
        channel.publish('dev-client', {text: `${messageText} @ ${new Date().toISOString()}`})
    }

    const handleInputChange = (e: any) => {
        setMessageText(e.target.value)
    }

    return (
        <div className="w-full max-w-4xl h-full flex flex-col my-32 border-0 border-black rounded-md p-4 gap-4">
            <div className="flex-1">
                <Logger logEntries={logs}  displayHeader={false}  />
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