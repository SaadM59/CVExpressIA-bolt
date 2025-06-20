import '../app/globals.css';
import Home from '../app/page-server';

export default function Index() {
  // Tout reste en client
  if (typeof window === 'undefined') return null;
  return <Home />;
}
