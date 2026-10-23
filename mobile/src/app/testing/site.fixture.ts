import { Site } from '../core/api.service';
import { FALLBACK_SITE } from '../core/site.fallback';

/** A small manifest shaped like content/site.json, for specs. */
export const SITE: Site = {
  ...FALLBACK_SITE,
  brand: { ...FALLBACK_SITE.brand, tagline: 'Plan it, ship it' },
  welcome: {
    slug: 'welcome',
    title: 'Welcome',
    icon: 'home-outline',
    summary: 'Plan the application',
    sections: [{ kind: 'steps', heading: 'Planning', items: [{ title: 'Name the domain' }] }],
  },
  about: {
    slug: 'about',
    title: `About ${FALLBACK_SITE.brand.collective}`,
    icon: 'people-outline',
    sections: [{ kind: 'text', heading: 'Who we are', body: 'A collective', items: [] }],
  },
  docs_url: 'http://localhost:8200',
  pages: [
    {
      slug: 'roadmap',
      title: 'Roadmap',
      icon: 'map-outline',
      sections: [{ kind: 'cards', items: [{ title: 'Release', icon: 'rocket-outline' }] }],
    },
  ],
};
