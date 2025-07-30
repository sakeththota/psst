export class Message {
  public username: string
  public text: string
  public timestamp: Date

  constructor(username: string, text: string) {
    this.username = username
    this.text = text
    this.timestamp = new Date()
  }
}

export type ChatProps = {
  messages: Array<Message>,
}

export default function Chat({ messages }: ChatProps) {
  return (
    <ul className="w-full h-full min-h-0 flex flex-col justify-end overflow-y-scroll">
      { messages.map((message: Message, index: number) => {
        return (
          <li key={index}>
            <div className="flex flex-row justify-between p-2 items-center">
              <div className="flex flex-row justify-start items-center gap-4">
                <p className="font-extrabold">{message.username}</p>
                <p>{message.text}</p>
              </div>
              <div className="text-neutral-400 text-sm">{message.timestamp.toLocaleString()}</div>
            </div>
          </li>
        )}
      )}
    </ul>
  )
}