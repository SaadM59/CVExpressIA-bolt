import dynamic from 'next/dynamic'

// Charge ton Home (page-server) uniquement côté client
const HomeClient = dynamic(
  () => import('../app/page-server'),
  { ssr: false }
)

export default function Index() {
  return <HomeClient />
}
