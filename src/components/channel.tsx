'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from "ably/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useCallback } from 'react'
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useChatScroll } from '@/hooks/use-scroll';
import { useChat } from '@/hooks/use-chat';

import { ChatMessage } from '@/components/chat-message';
import { Message } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';

interface ChannelProps {
    channelName: string,
    username: string
}

export default function Channel({ channelName, username }: ChannelProps) {
    const ably = new Ably.Realtime ({ key: process.env.NEXT_PUBLIC_ABLY_API_KEY });

    return (
        <AblyProvider client={ ably }>
            <ChannelProvider channelName={channelName}>
                <ChatWindow channelName={channelName} username={username} />
            </ChannelProvider>
        </AblyProvider>
    )
}

interface ChatWindowProps {
    channelName: string,
    username: string
}

function ChatWindow({ channelName, username }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState<string>('')

    const { messages, sendMessage } = useChat({channelName, username})
    const handleSendMessage = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        sendMessage(newMessage)
        setNewMessage('')
    },[newMessage, sendMessage])
    
    const { containerRef, scrollToBottom } = useChatScroll()
    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])
    

    return (
        <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
            {/* Messages */}
            <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                    {messages.map((message: Message, index: number) => {
                        const prevMessage = index > 0 ? messages[index-1] : null
                        const showHeader = !prevMessage || prevMessage.username !== message.username
                        
                        return (
                            <div 
                                key={index}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                            >
                                <ChatMessage
                                    message={message}
                                    isOwn={message.username == username}
                                    showHeader={showHeader}
                                />
                            </div>
                        )}
                )}  
                </div>
                
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex w-full gap-2 border-t border-border p-4">
                <Input  
                    className={cn('rounded-full bg-background text-sm transition-all duration-300',
                        newMessage.trim() ? 'w-[calc(100%-36px)]' : 'w-full'
                    )}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                {newMessage.trim() &&
                    <Button
                        className="aspect-square rounded-full animate-in fade-in slide-in-from-right-3 duration-300" 
                        type="submit"
                    >
                        <PaperPlaneIcon />
                    </Button>
                }
            </form>
        </div>
    )
}