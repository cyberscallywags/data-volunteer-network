import { addIcons } from 'ionicons';
import {
  addOutline,
  bookOutline,
  desktopOutline,
  documentTextOutline,
  gitNetworkOutline,
  globeOutline,
  homeOutline,
  layersOutline,
  listOutline,
  logInOutline,
  logOutOutline,
  mapOutline,
  peopleOutline,
  personCircleOutline,
  phonePortraitOutline,
  rocketOutline,
  serverOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

// Standalone Ionic only renders registered icons. Names in site.json must be listed here;
// anything else falls back to FALLBACK_ICON rather than rendering blank.
const ICONS = {
  'add-outline': addOutline,
  'book-outline': bookOutline,
  'desktop-outline': desktopOutline,
  'document-text-outline': documentTextOutline,
  'git-network-outline': gitNetworkOutline,
  'globe-outline': globeOutline,
  'home-outline': homeOutline,
  'layers-outline': layersOutline,
  'list-outline': listOutline,
  'log-in-outline': logInOutline,
  'log-out-outline': logOutOutline,
  'map-outline': mapOutline,
  'people-outline': peopleOutline,
  'person-circle-outline': personCircleOutline,
  'phone-portrait-outline': phonePortraitOutline,
  'rocket-outline': rocketOutline,
  'server-outline': serverOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
};

export const FALLBACK_ICON = 'document-text-outline';

export function registerIcons(): void {
  addIcons(ICONS);
}

export function iconName(name: string | null | undefined): string {
  return name && name in ICONS ? name : FALLBACK_ICON;
}
