import PubSubClient from './pubsub-client'

export default function Home() {
  return (
    <main className="w-screen h-screen box-border flex flex-col items-center">
      <PubSubClient />
    </main>
  )
}

