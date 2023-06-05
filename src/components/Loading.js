import { m } from 'framer-motion';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
//
import Layout from './../layouts';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center',
        background: '#04265d2e',
        height: '100%',
        width: '100%',
        top: 120,
        left: 0,
        right: 30,
      }}
    >
      <CircularProgress sx={{ marginLeft:(9*4) }} size={80} />
    </Box>
  );
}
