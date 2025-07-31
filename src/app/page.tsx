import Channel from '@/components/channel'

export default function Home() {
  return (
    <main className="box-border w-screen h-screen min-h-0 flex flex-col items-center">
      <Channel channelName='dev' username='skth.dev' />
    </main>
  )
}