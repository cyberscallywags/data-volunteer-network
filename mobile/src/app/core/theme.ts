import { Theme } from './api.service';

type Rgb = [number, number, number];

const hexToRgb = (hex: string): Rgb => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const rgbToHex = (rgb: Rgb): string =>
  '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

const mix = (rgb: Rgb, toward: number, weight: number): Rgb =>
  rgb.map((v) => v + (toward - v) * weight) as Rgb;

/** White or black text, whichever reads better on the colour (WCAG relative luminance). */
export function contrastFor(hex: string): string {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.179 ? '#000000' : '#ffffff';
}

/** Ionic's full colour variable set (base, rgb, contrast, shade, tint) for one hex colour. */
export function ionColour(name: string, hex: string): Record<string, string> {
  const rgb = hexToRgb(hex);
  const contrast = contrastFor(hex);
  return {
    [`--ion-color-${name}`]: hex,
    [`--ion-color-${name}-rgb`]: rgb.join(', '),
    [`--ion-color-${name}-contrast`]: contrast,
    [`--ion-color-${name}-contrast-rgb`]: hexToRgb(contrast).join(', '),
    [`--ion-color-${name}-shade`]: rgbToHex(mix(rgb, 0, 0.12)),
    [`--ion-color-${name}-tint`]: rgbToHex(mix(rgb, 255, 0.1)),
  };
}

/** Maps the site theme onto Ionic's CSS variables; FastUI maps the same values onto Bootstrap. */
export function applyTheme(theme: Theme, root: HTMLElement): void {
  const vars = {
    ...ionColour('primary', theme.primary),
    ...ionColour('secondary', theme.secondary),
    ...ionColour('tertiary', theme.tertiary),
    '--ion-font-family': theme.font_family,
  };
  for (const [key, value] of Object.entries(vars)) root.style.setProperty(key, value);
}
