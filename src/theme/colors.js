import { alpha } from '@mui/material/styles';
import { api } from './../api/';
import { useEffect } from 'react';

// export default function ThemeColor() {
var getLocation = function (href) {
  if (typeof window !== 'undefined') {
    var l = document.createElement('a');
    l.href = href;
    return l;
  }
};

var createGradient = (color1, color2) => {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
};
export const customtheme = (async (e) => {
  let _colors = {
    PRIMARY: {
      lighter: '#C8FACD',
      light: '#5BE584',
      main: '#123871',
      dark: '#071b3c',
      darker: '#005249',
    },
    SECONDARY: {
      lighter: '#D6E4FF',
      light: '#84A9FF',
      main: '#3366FF',
      dark: '#1939B7',
      darker: '#091A7A',
    },
    INFO: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#1890FF',
      dark: '#0C53B7',
      darker: '#04297A',
    },
    SUCCESS: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
    },
    WARNING: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
    },
    ERROR: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
    },
  };

  // SETUP COLORS

  try {
  } catch (error) {
    console.log(error, 'error');
  }

  return _colors;
})();


