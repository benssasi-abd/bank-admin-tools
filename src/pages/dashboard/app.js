// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopAuthors,
  AppNewUsers,
} from '../../sections/@dashboard/general/app';

// redux
// ../../../redux/store
import { useDispatch, useSelector } from './../../redux/store';
import { getMe } from './../../redux/user';
import { dashboardUser } from './../../redux/admin';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const dispatch = useDispatch();

  const { dashboard } = useSelector((state) => state.admin);

  const { user } = useAuth();

  const theme = useTheme();

  const [_dashboard, setDashboardUser] = useState(dashboard);

  const { themeStretch } = useSettings();

  useEffect(() => {
    dispatch(getMe());
    dispatch(dashboardUser());
  }, [dispatch]);


   function getValStatu(s) {
     console.log(dashboard, 'dashboard');
   }
  
  useEffect(() => {
    setDashboardUser(dashboard);
    console.log(getValStatu('1'));
    getValStatu('1');
  }, [dashboard]);




  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome currentuser={user} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Clients"
              // percent={2.6}
              sx={{ backgroundColor: '#c8e1fa', color: '#003b76' }}
              total={dashboard?.total}
              // chartColor={theme.palette.primary.main}
              // chartData={[dashboard?.total, dashboard?.total, dashboard?.total]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total of active Clients"
              // percent={0.2}
              sx={{ backgroundColor: '#c8facd', color: '#00a911' }}
              total={dashboard?.active}
              // chartColor={theme.palette.chart.blue[0]}
              // chartData={[dashboard?.active, dashboard?.active, dashboard?.active]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total of blocked Clients"
              // percent={-0.1}
              total={dashboard?.blocked}
              sx={{ backgroundColor: '#ffe3d5', color: '#f65605' }}
              // chartColor={theme.palette.chart.red[0]}
              // chartData={[dashboard?.blocked, dashboard?.blocked, dashboard?.blocked]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={4}>
            <AppNewUsers />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
