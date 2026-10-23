/** A side-menu entry. Manifest pages become entries automatically; see AppComponent.nav. */
export interface NavEntry {
  title: string;
  path: string;
  icon: string;
}

/**
 * Code-backed screens, listed after the manifest's pages. To add one: create it under
 * pages/, add its route in app.routes.ts and an entry here.
 */
export const FEATURES: NavEntry[] = [{ title: 'Items', path: '/items', icon: 'list-outline' }];
