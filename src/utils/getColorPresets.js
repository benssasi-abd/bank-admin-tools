// theme
import palette from '../theme/palette';

// ----------------------------------------------------------------------

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: 'purple',
    lighter: '#EBD6FD',
    light: '#B985F4',
    main: '#7635dc',
    dark: '#431A9E',
    darker: '#200A69',
    contrastText: '#fff',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#D1FFFC',
    light: '#76F2FF',
    main: '#1CCAFF',
    dark: '#0E77B7',
    darker: '#053D7A',
    contrastText: palette.light.grey[800],
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#D1E9FC',
    light: '#76B0F1',
    main: '#2065D1',
    dark: '#103996',
    darker: '#061B64',
    contrastText: '#fff',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#FEF4D4',
    light: '#FED680',
    main: '#fda92d',
    dark: '#B66816',
    darker: '#793908',
    contrastText: palette.light.grey[800],
  },
  // RED
  {
    name: 'red',
    lighter: '#FFE3D5',
    light: '#FFC1AC',
    main: '#FF3030',
    dark: '#B71833',
    darker: '#7A0930',
    contrastText: '#fff',
  },
  // GREEN
  {
    name: 'green',
    lighter: '#d5fff6',
    light: '#aeffac',
    main: '#16f366',
    dark: '#18b777',
    darker: '#097a4d',
    contrastText: '#fff',
  },
  // pink
  {
    name: 'pink',
    lighter: '#ff93be',
    light: '#ff6794',
    main: '#b44671',
    dark: '#7c3055',
    darker: '#582142',
    contrastText: '#fff',
  },
  // brown
  {
    name: 'brown',
    lighter: '#e5b5b5',
    light: '#c7879a',
    main: '#886076',
    dark: '#40354e',
    darker: '#40354e',
    contrastText: '#fff',
  },
  // BLUE DARK
  {
    name: 'bluedark',
    lighter: '#20d0d8',
    light: '#2098d8',
    main: '#145988',
    dark: '#122842',
    darker: '#120907',
    contrastText: '#fff',
  },
];


export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];
export const greenPreset = colorPresets[6];
export const pinkPreset = colorPresets[7];
export const brownPreset = colorPresets[8];
export const bluedarkPreset = colorPresets[9];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    green: greenPreset,
    pink: pinkPreset,
    brown: brownPreset,
    bluedark: bluedarkPreset,
    default: defaultPreset,
  }[presetsKey];
}
