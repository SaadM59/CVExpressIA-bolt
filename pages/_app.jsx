// pages/_app.jsx
import '../styles/globals.css';    // ← chemin vers le nouveau CSS

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
