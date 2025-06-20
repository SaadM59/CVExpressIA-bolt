import '../styles/globals.css';
import Generate from '../app/generate/page-client';

export default function GeneratePage() {
  if (typeof window === 'undefined') return null;
  return <Generate />;
}
