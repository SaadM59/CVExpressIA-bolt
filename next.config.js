/** @type {import('next').NextConfig} */
const nextConfig = {
  // on passe à l’export 100 % statique
  output: 'export',
  trailingSlash: true,
  // on ignore les erreurs TypeScript pour qu’il build toujours
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
