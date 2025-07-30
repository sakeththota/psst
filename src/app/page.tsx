import PubSubClient from './pubsub-client'

export default function Home() {
  return (
    <main className="box-border w-screen h-screen min-h-0 flex flex-col items-center">
      <PubSubClient />
    </main>
  )
}