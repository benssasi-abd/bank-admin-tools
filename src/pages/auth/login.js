import { capitalCase } from 'change-case';
import { useEffect } from 'react';

// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// guards
import GuestGuard from '../../guards/GuestGuard';
// components
import Page from '../../components/Page';
import CustomLogo from '../../components/CustomLogo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

import user_img from './../../utils/helper';

import user_theme from './../../utils/getThemeUser';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7),
//   },
// }));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 600,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method, style } = useAuth();
  const { asPath } = useRouter();


  console.log(style, 'style');
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  function urlPath() {
    const origin = typeof window !== 'undefined' && window.location ? window.location : '';
    let URL = `${origin.host}`;
    URL = URL.split(':')[0];
    return URL;
  }

  

  useEffect(() => {
    // user_theme(urlPath());
  }, []);
  

  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          {mdUp && (
            <SectionStyle>
              <Image visibleByDefault disabledEffect src={user_img('loginPage')} alt="login" />
            </SectionStyle>
          )}

          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                </Box>

                <Tooltip title={capitalCase(method)} placement="right">
                  <>
                    <CustomLogo sx={{ height: '100px' }} ratio="1/1" url={user_img('avatar')} />
                  </>
                </Tooltip>
              </Stack>
              <LoginForm />

              {!smUp && (
                <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant="subtitle2">Get started</Link>
                  </NextLink>
                </Typography>
              )}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  );
}
