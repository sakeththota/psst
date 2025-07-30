import PubSubClient from './pubsub-client'
import io from 'socket.io-client'

const socket = io()

export default function Home() {
  return (
    <main className="w-screen h-screen box-border flex flex-col items-center">
      <PubSubClient />
    </main>
  )
}

