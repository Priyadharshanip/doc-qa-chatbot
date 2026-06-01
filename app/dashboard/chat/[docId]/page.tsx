import ChatWindow from '@/components/ChatWindow'

export default async function ChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ docId: string }>
  searchParams: Promise<{ name?: string }>
}) {
  const { docId } = await params
  const { name } = await searchParams

  const fileName = name ? decodeURIComponent(name) : 'Your Document'

  return <ChatWindow docId={docId} fileName={fileName} />
}