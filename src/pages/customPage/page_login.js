import { capitalCase } from 'change-case';
import { useRouter } from 'next/router';
// @mui
import isString from 'lodash/isString';
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Alert, Tooltip, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
// sections
import { CustomFormLogin } from '../../sections/auth/login';
import { MenuConfig, MenuStyle } from '../../components/styles-menu';
// redux
import { useSelector } from './../../redux/store';
import user_img from './../../utils/helper';
// ----------------------------------------------------------------------
// config
import { NAVBAR } from '../../config';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

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

export default function Pagelogin() {
  const mdUp = useResponsive('up', 'md');
  const { pathname, asPath } = useRouter();
  const { style } = useSelector((state) => state.style);

  function urlPath() {
    const origin = typeof window !== 'undefined' && window.location ? window.location : '';
    let URL = `${origin.host}`;
    URL = URL.split(':')[0];
    return URL;
  }

  return (
    <Page title="Login" sx={{ width: style.width }}>
      <MenuStyle navbar={NAVBAR} navConfig={MenuConfig} />
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            {style.pagelogin.preview ? (
              <Image
                visibleByDefault
                disabledEffect
                src={isString(style.pagelogin) ? style.pagelogin : style.pagelogin.preview}
                ratio="1/1"
                alt="login"
              />
            ) : (
              <Image visibleByDefault disabledEffect src={user_img('loginPage')} height="100%" alt="login" />
            )}
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1, color: style?.colorText }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Ihold Bank
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>

              <Tooltip title={capitalCase('')} placement="right">
                <>
                  {/* <Logo /> */}

                  <Box sx={{ width: 70, height: 70, cursor: 'pointer' }}>
                    {style.logo.preview ? (
                      <Image
                        visibleByDefault
                        disabledEffect
                        src={isString(style.logo) ? style.logo : style.logo.preview}
                        alt="login"
                      />
                    ) : (
                      <Image visibleByDefault disabledEffect src={user_img('avatar')} alt="login" />
                    )}
                  </Box>
                </>
              </Tooltip>
            </Stack>

            <CustomFormLogin colortext={style.colorText} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
