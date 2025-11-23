import { Metadata } from 'next';

// Site-wide SEO configuration
export const siteConfig = {
  name: 'SMVIT DEBSOC',
  fullName: 'SMVIT Debating Society',
  description: 'Official website of SMVIT Debating Society - Empowering voices through the art of debate. Join us for structured debates, competitive training, and intellectual discourse.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://smvitdebsoc.com',
  ogImage: '/og-image.jpg',
  keywords: [
    'SMVIT Debate Society',
    'SMVIT DEBSOC',
    'debate club Bangalore',
    'parliamentary debate',
    'British parliamentary debate',
    'Asian parliamentary debate',
    'debate society',
    'public speaking club',
    'SMVIT college clubs',
    'debating competitions',
    'critical thinking',
    'Sir M Visvesvaraya Institute of Technology',
    'college debate team',
    'debate training',
    'mock debates',
  ],
  social: {
    instagram: 'https://www.instagram.com/smvit_debsoc/',
    facebook: 'https://www.facebook.com/people/SMVIT-DEBSOC/100085129608350/',
    youtube: 'https://www.youtube.com/@smvitdebsoc738',
    email: 'smvitdebsoc12@gmail.com',
  },
  organization: {
    name: 'SMVIT Debating Society',
    alternateName: 'SMVIT DEBSOC',
    foundingDate: '2018',
    address: {
      streetAddress: 'Sir M Visvesvaraya Institute of Technology',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '562157',
      addressCountry: 'IN',
    },
  },
};

// Generate metadata for pages
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title,
    description,
    keywords: keywords || siteConfig.keywords,
    authors: [
      { name: 'SMVIT DEBSOC Development Team' },
      { name: 'Md. Mobasshir Shakil Khan', url: 'https://github.com/mobi2400' },
      { name: 'Ayush Kumar', url: 'https://github.com/ayushkumar320' },
    ],
    creator: 'SMVIT DEBSOC Development Team',
    publisher: 'SMVIT Debating Society',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@smvit_debsoc',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
