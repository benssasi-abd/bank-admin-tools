import PropTypes from 'prop-types';
import { useMemo, useCallback, useEffect, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
// hooks
import useAuth from '../hooks/useAuth';
//
import palette from './palette';
// import palette from './../pages/theme/paletteCustom';
//  import { customtheme } from './colors';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';
  const [custom_Palette, setCustompalette] = useState([]);

  //  useEffect(() => {
  //    const p = Promise.resolve(customtheme);
  //    p.then((value) => {
  //      setCustompalette(value);
  //    });
  //  }, [custom_Palette]);
  
  // console.log(custom_Palette.PRIMARY, 'custom_Palette');
  
  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? {
            ...palette.light,
            custom_primary: palette.PRIMARY,
          }
        : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  
  console.log(themeOptions, 'themeOptions');

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  // console.log(theme, 'theme');
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
