import { Organization, WithContext } from 'schema-dts';
import { siteConfig } from '../metadata';

export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    alternateName: siteConfig.organization.alternateName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: siteConfig.organization.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.social.email,
      contactType: 'General Inquiries',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.streetAddress,
      addressLocality: siteConfig.organization.address.addressLocality,
      addressRegion: siteConfig.organization.address.addressRegion,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.addressCountry,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.youtube,
    ],
    memberOf: {
      '@type': 'EducationalOrganization',
      name: 'Sir M Visvesvaraya Institute of Technology',
    },
  };
}
