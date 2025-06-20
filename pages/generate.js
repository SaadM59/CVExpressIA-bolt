import dynamic from 'next/dynamic'

const GenerateClient = dynamic(
  () => import('../app/generate/page-client'),
  { ssr: false }
)

export default function GeneratePage() {
  return <GenerateClient />
}
