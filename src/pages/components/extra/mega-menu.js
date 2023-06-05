// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, AppBar, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  MenuConfig,
  MegaMenuMobile,
  MegaMenuDesktopHorizon,
} from '../../../components/mega-menu';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoMegaMenu.getLayout = function getLayout(page) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoMegaMenu() {
  return (
    <Page title="Mega Menu">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Mega Menu"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Mega Menu' }]}
            />
          </Container>
        </Box>

        <AppBar
          position="static"
          color="transparent"
          sx={{
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          <Container sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Menu Horizon
            </Typography>
            <MegaMenuDesktopHorizon navConfig={MenuConfig} />
          </Container>
        </AppBar>

        <Container sx={{ mt: 10 }}>
          <MegaMenuMobile navConfig={MenuConfig} />
        </Container>
      </RootStyle>
    </Page>
  );
}
