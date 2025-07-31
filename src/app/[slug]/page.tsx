import Channel from '@/components/channel'

type PageProps = {
    params: Promise<{ slug: string }>
    searchParams?: Promise<{ username?: string }>
}

export default async function ChannelPage({ params, searchParams  }: PageProps) {
    const { slug } = await params
    const username = (await searchParams)?.username ?? 'unkwn'

    return (
        <main className="box-border w-screen h-screen min-h-0 flex flex-col items-center">
            <Channel channelName={slug} username={username} />
        </main>
    )
}