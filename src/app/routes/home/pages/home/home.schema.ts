export const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://lazarortega.com/#professionalservice',
  name: 'Cortador de Jamón Profesional en Alicante | Lázaro Ortega Izquierdo',
  url: 'https://lazarortega.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://lazarortega.com/img/lazaro-ortega/lazaro-logo-cortador-de-jamon.webp',
    width: 512,
    height: 512,
  },
  image: {
    '@type': 'ImageObject',
    url: 'https://lazarortega.com/img/lazaro-ortega/cuerpo.webp',
    width: 1200,
    height: 800,
  },
  description:
    'Cortador de Jamón Profesional en Alicante con más de 15 años de experiencia. Servicios para bodas, eventos corporativos, ferias y celebraciones en toda la provincia.',
  priceRange: '€€€',
  email: 'lazarortega@hotmail.es',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Aspe',
    addressRegion: 'Alicante',
    postalCode: '03680',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.345111,
    longitude: -0.767211,
  },
  hasMap: 'https://maps.app.goo.gl/cqqn2ZjTjzgDgnSL8',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Provincia de Alicante',
  },
  founder: {
    '@type': 'Person',
    name: 'Lázaro Ortega Izquierdo',
    sameAs: [
      'https://x.com/lazarortega2',
      'https://www.instagram.com/lazarortega2',
    ],
  },
  sameAs: [
    'https://x.com/lazarortega2',
    'https://www.instagram.com/lazarortega2',
  ],
};
