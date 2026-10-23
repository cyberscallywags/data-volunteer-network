import { Site } from './api.service';

/**
 * Shown until GET /site answers (and when the API is unreachable on first launch).
 * Keep the theme in step with src/theme/variables.scss so the first paint matches.
 */
export const FALLBACK_SITE: Site = {
  brand: {
    name: 'Sgaffald',
    tagline: '',
    collective: 'Cyber Scallywags',
    collective_url: null,
  },
  theme: {
    primary: '#1b4965',
    secondary: '#5fa8d3',
    tertiary: '#e4572e',
    font_family: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  welcome: { slug: 'welcome', title: 'Welcome', icon: 'home-outline', sections: [] },
  about: { slug: 'about', title: 'About', icon: 'people-outline', sections: [] },
  pages: [],
};
