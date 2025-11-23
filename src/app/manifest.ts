import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SMVIT DEBSOC - Debating Society',
    short_name: 'SMVIT DEBSOC',
    description: 'Official website of SMVIT Debating Society - Empowering voices through debate',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
