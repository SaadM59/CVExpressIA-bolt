import dynamic from 'next/dynamic'

// Charge le composant Generate en client-only
const GenerateClient = dynamic(
  () => import('../app/generate/page-client'),
  { ssr: false }
)

export default function GeneratePage() {
  return <GenerateClient />
}
