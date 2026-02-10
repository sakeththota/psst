'use client'

import * as Ably from 'ably';
import { AblyProvider, ChannelProvider } from "ably/react"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { PaperPlaneIcon } from "@radix-ui/react-icons"
import { useChatScroll } from '@/hooks/use-scroll';
import { useChat } from '@/hooks/use-chat';
import { useChannelPresence } from '@/hooks/use-presence';
import { useUnread } from '@/hooks/use-unread';

import { ChatMessage } from '@/components/chat-message';
import { Message } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';

interface ChannelProps {
    channelName: string,
    username: string
}

const CHANNEL_PREFIX = 'psst:'

export default function Channel({ channelName, username }: ChannelProps) {
    const [ablyClient] = useState(() => new Ably.Realtime({
        key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
        clientId: username,
        closeOnUnload: true,
    }))

    const ablyChannelName = `${CHANNEL_PREFIX}${channelName}`

    return (
        <AblyProvider client={ ablyClient }>
            <ChannelProvider channelName={ablyChannelName}>
                <ChatWindow channelName={channelName} ablyChannelName={ablyChannelName} username={username} />
            </ChannelProvider>
        </AblyProvider>
    )
}

interface ChatWindowProps {
    channelName: string,
    ablyChannelName: string,
    username: string
}

function ChatWindow({ channelName, ablyChannelName, username }: ChatWindowProps) {
    const [newMessage, setNewMessage] = useState<string>('')

    const { messages, setMessages, sendMessage } = useChat({channelName: ablyChannelName, username})

    const addSystemMessage = useCallback((content: string) => {
        setMessages(prev => [...prev, {
            content,
            username: '',
            createdAt: new Date().toISOString(),
            type: 'system',
        }])
    }, [setMessages])

    const { presentMembers } = useChannelPresence({
        channelName: ablyChannelName,
        username,
        onMemberJoin: useCallback((memberName: string) => {
            addSystemMessage(`${memberName} joined the room`)
        }, [addSystemMessage]),
        onMemberLeave: useCallback((memberName: string) => {
            addSystemMessage(`${memberName} left the room`)
        }, [addSystemMessage]),
    })

    // Only count non-system messages for unread badge
    const chatMessageCount = messages.filter((m) => m.type === 'message').length
    useUnread({ channelName, messageCount: chatMessageCount })

    const handleSendMessage = useCallback((e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        sendMessage(newMessage)
        setNewMessage('')
        inputRef.current?.focus()
    },[newMessage, sendMessage])
    
    const { containerRef, scrollToBottom } = useChatScroll()
    useEffect(() => {
        scrollToBottom()
    }, [messages, scrollToBottom])
    
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div className="flex flex-col h-full w-full bg-background text-foreground antialiased">
            {/* Room header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">
                    #{channelName}
                </span>
                <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground/60 mr-1">
                        {presentMembers.length} online
                    </span>
                    {presentMembers.map((member, index) => (
                        <span
                            key={`${member.clientId}-${index}`}
                            className={cn(
                                'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                                member.username === username
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground'
                            )}
                        >
                            {member.username}
                        </span>
                    ))}
                </div>
            </div>

            {/* Messages */}
            <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="space-y-1">
                    {messages.map((message: Message, index: number) => {
                        const prevMessage = index > 0 ? messages[index-1] : null
                        const showHeader = message.type !== 'system' && (!prevMessage || prevMessage.username !== message.username || prevMessage.type === 'system')
                        
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
                    ref={inputRef}
                    autoFocus
                    className={cn('rounded-full bg-background text-base transition-all duration-300',
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
