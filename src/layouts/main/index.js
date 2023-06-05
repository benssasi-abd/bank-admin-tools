import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Link, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import user_img from './../../utils/helper';

import Image from '../../components/Image';

// ----------------------------------------------------------------------

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainLayout({ children }) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      {/* <MainHeader /> */}

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <Box
          sx={{
            py: 5,
            textAlign: 'center',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Container>
            {/* <Logo sx={{ mb: 1, mx: 'auto' }} /> */}

            {/* <Box
              sx={{ width: '100px', height: '100px' }}
            >
              <Image
                visibleByDefault
                disabledEffect
                src={user_img('avatar')}
                alt="login"
              />
            </Box> */}

            <Typography variant="caption" component="p">
              © All rights reserved
              <br /> made by &nbsp;
              <Link href="https://twinsgroupe.com/">Twins.</Link>
            </Typography>
          </Container>
        </Box>
      )}
    </Stack>
  );
}
