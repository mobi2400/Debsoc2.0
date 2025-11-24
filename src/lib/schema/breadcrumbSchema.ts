import { BreadcrumbList, WithContext } from 'schema-dts';
import { siteConfig } from '../metadata';

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function generateBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

// Predefined breadcrumbs for common pages
export const pageBreadcrumbs = {
  home: [{ name: 'Home', path: '/' }],
  gallery: [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ],
  debateTimer: [
    { name: 'Home', path: '/' },
    { name: 'Debate Timer', path: '/debateTimer' },
  ],
  equity: [
    { name: 'Home', path: '/' },
    { name: 'Equity Policy', path: '/equity' },
  ],
  session: [
    { name: 'Home', path: '/' },
    { name: 'Session', path: '/session' },
  ],
};
