export const SITE_CONFIG = {
  name: 'Frankie Says',
  fullName: 'Frankie Says Melbourne',
  tagline: 'Start today not tomorrow',
  description:
    'Brunch cafe & evening dining in the heart of Melbourne. Fresh seasonal menus, craft cocktails, and unforgettable experiences.',
  phone: '0431 701 700',
  email: 'hello@frankiesaysmelbourne.com',
  whatsapp: '61431701700',
  address: {
    street: '15 Acacia Pl',
    suburb: 'Abbotsford',
    state: 'VIC',
    postcode: '3067',
    country: 'Australia',
    full: '15 Acacia Pl, Abbotsford VIC 3067',
  },
  coordinates: {
    lat: -37.8023,
    lng: 145.0001,
  },
  social: {
    instagram: 'https://www.instagram.com/frankiesaysmelb/',
    tiktok: 'https://www.tiktok.com/@frankiesayscafe',
    facebook: 'https://www.facebook.com/groups/162205097254936/user/61583343495265/',
  },
  googleMapsUrl:
    'https://www.google.com/maps/place/15+Acacia+Pl,+Abbotsford+VIC+3067',
} as const

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/booking', label: 'Book a Table' },
  { path: '/events', label: 'Events' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
] as const
