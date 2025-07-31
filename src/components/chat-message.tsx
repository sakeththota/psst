import { Message } from "@/hooks/use-chat"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
    message: Message,
    isOwn: boolean,
    showHeader: boolean,
}

export const ChatMessage = ({ message, isOwn, showHeader}: ChatMessageProps) => {
    return (
        <div className={`flex mt-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div 
                className={cn('max-w-[75%] w-fit flex flex-col gap-1', {
                    'items-end': isOwn,
                })}
            >
                {showHeader && (
                    <div
                        className={cn('flex items-center gap-2 text-xs px-3', {
                            'justify-end flex-row-reverse': isOwn,
                        })}
                    >
                        <span className="font-medium">{message.username}</span>
                        <span className="text-foreground/50 text-xs">
                            {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                            })}
                        </span>
                    </div>
                )}
                <div
                    className={cn('py-2 px-3 rounded-xl text-sm w-fit',
                        isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
                    )}
                >
                    {message.content}
                </div>
            </div>
        </div>
    )
}