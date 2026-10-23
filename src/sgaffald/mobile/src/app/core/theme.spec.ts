import { applyTheme, contrastFor, ionColour } from './theme';

describe('theme', () => {
  it('picks readable contrast text', () => {
    expect(contrastFor('#1b4965')).toBe('#ffffff');
    expect(contrastFor('#ffd166')).toBe('#000000');
  });

  it('derives the full Ionic colour set', () => {
    expect(ionColour('primary', '#1b4965')).toEqual({
      '--ion-color-primary': '#1b4965',
      '--ion-color-primary-rgb': '27, 73, 101',
      '--ion-color-primary-contrast': '#ffffff',
      '--ion-color-primary-contrast-rgb': '255, 255, 255',
      '--ion-color-primary-shade': '#184059',
      '--ion-color-primary-tint': '#325b74',
    });
  });

  it('writes the variables onto the root element', () => {
    const root = document.createElement('div');
    applyTheme(
      { primary: '#112233', secondary: '#445566', tertiary: '#778899', font_family: 'serif' },
      root,
    );
    expect(root.style.getPropertyValue('--ion-color-secondary')).toBe('#445566');
    expect(root.style.getPropertyValue('--ion-font-family')).toBe('serif');
  });
});
