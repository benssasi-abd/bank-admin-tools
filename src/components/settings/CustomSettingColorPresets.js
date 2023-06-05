import { useState, useCallback, useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Grid, RadioGroup, CardActionArea } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// redux
import { useDispatch } from './../../redux/store';
import { updateStyleColumn } from './../../redux/style';
//
import { BoxMask } from '.';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.disabled,
  border: `solid 1px ${theme.palette.grey[500_12]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function CustomSettingColorPresets({ onChangeTheme }) {
  const [_colorValue, setcolorValue] = useState('');

  const { themeColorPresets, colorValue, onChangeColor, colorOption } = useSettings();

  const dispatch = useDispatch();

  const colors = [
    { id: 'purple', val: '#7635dc' },
    { id: 'cyan', val: '#1CCAFF' },
    { id: 'blue', val: '#2065D1' },
    { id: 'red', val: '#FF3030' },
    { id: 'green', val: '#16f366' },
    { id: 'orange', val: '#fda92d' },
    { id: 'pink', val: '#b44671' },
    { id: 'bluedark', val: '#145988' },
    { id: 'brown', val: '#886076' },
    { id: 'default', val: '#1b4f78' },
  ];
  return (
    <RadioGroup
      name="themeColorPresets"
      value={themeColorPresets}
      colormain={colorValue}
      onChange={(e) => {
        let colorValue = colors.find((item) => item.id === e.target.value);
        console.log(colorValue.val, 'colorValue');
        console.log(e.target.value, 'e.target.value');
        // onChangeColor(e);
        dispatch(updateStyleColumn(e.target.value, 'themecolorpresets'));
        dispatch(updateStyleColumn(colorValue.val, 'colorText'));
      }}
    >
      <Grid dir="ltr" container spacing={1.5}>
        {colorOption.map((color) => {
          const colorName = color.name;
          const colorValue = color.value;
          const isSelected = themeColorPresets === colorName;

          console.log(colorOption, 'colorOption');

          return (
            <Grid key={colorName} item xs={4}>
              <BoxStyle
                sx={{
                  height: 120,
                  ...(isSelected &&
                    {
                      // bgcolor: alpha(colorValue, 0.08),
                      // border: `solid 2px ${colorValue}`,
                      // boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`,
                    }),
                }}
              >
                <Box
                  sx={{
                    width: 20,
                    height: 100,
                    bgcolor: color.darker,
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 100,
                    bgcolor: color.dark,
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 100,
                    bgcolor: colorValue,
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 100,
                    bgcolor: color.light,
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 100,
                    bgcolor: color.lighter,
                    transition: (theme) =>
                      theme.transitions.create('all', {
                        easing: theme.transitions.easing.easeInOut,
                        duration: theme.transitions.duration.shorter,
                      }),
                    ...(isSelected && { transform: 'none' }),
                  }}
                />

                <BoxMask value={colorName} />
              </BoxStyle>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
