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
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col justify-start items-start rounded-lg border border-foreground h-full">
        {/* <div className="flex flex-row justify-start items-center pt-3 pr-2 pb-3 pl-2 border-b border-foreground w-full">
          <div className="flex flex-row justify-start items-start gap-1.5 pt-2.5 pr-2.5 pb-2.5 pl-2.5 h-7">
            <img width="10px" height="10px" src="/assets/RedButton.svg" alt="Red" />
            <img width="10px" height="10px" src="/assets/YellowButton.svg" alt="Yellow" />
            <img width="10px" height="10px" src="/assets/GreenButton.svg" alt="Green" />
          </div>
        </div> */}

        <div className="flex flex-col-reverse justify-start items-start gap-4 pt-6 pr-6 pb-6 pl-6 w-full flex-1 overflow-y-scroll overflow-x-hidden scrollbar-thumb-slate-500 scrollbar-track-black-100 scrollbar">
          <div className="text-base text-foreground leading-normal font-medium bg-blue-200">
            <ul>
              { messages.map((message: Message, index: number) => {
                return (
                  <li key={index}>
                    <div>{index+1} &nbsp; {message.username}: &nbsp; {message.text} &nbsp; {message.timestamp.toLocaleString()}</div>
                  </li>
                )}
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}