'use client'
import * as Ably from 'ably';
import { useChannel } from 'ably/react';
import { useCallback, useEffect, useState } from 'react'

interface UseChatProps {
    channelName: string,
    username: string
}

export interface Message {
    content: string,
    username: string,
    createdAt: string,
}

export function useChat({ channelName, username }: UseChatProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const { channel } = useChannel(channelName, (message: Ably.Message) => {
        setMessages(prev => [...prev, 
            {
                content: message.data.content,
                username: message.name || 'unkwn',
                createdAt: new Date().toISOString(),
            }
        ])
    });

    const sendMessage = useCallback(
        async (newMessage: string) => {
            if (!channel) return
            await channel.publish(username, {content: newMessage})
        },
        [channel, username]
    )

    return { messages, sendMessage }
}