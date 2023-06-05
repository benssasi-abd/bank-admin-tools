import { useState, useEffect } from 'react';
import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  TenantNewGeneral,
  TenantNewStylesWeb,
  TenantNewStylesMobile,
  TenantNewPreview,
} from '../../../sections/@dashboard/tenant/accountTenant';
import { useSelector } from '../../../redux/store';
// hooks
import useTabs from '../../../hooks/useTabs';
import { AccountGeneral, AccountStyles } from '../../../sections/@dashboard/user/bank/account';

// ----------------------------------------------------------------------

TenantCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TenantCreate() {
  const { themeStretch } = useSettings();

  const { style } = useSelector((state) => state.style);

  const { currentTab, setCurrentTab, onChangeTab } = useTabs('account');

  useEffect(() => {
    setCurrentTab(style.currentTabTenant);
    console.log(currentTab, 'currentTabU');
  }, [currentTab]);

  const ACCOUNT_TABS = [
    {
      value: 'account',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: (
        <TenantNewGeneral
          onPress={() => {
            setCurrentTab('stylesTenantWeb');
          }}
        />
      ),
    },
    {
      value: 'stylesTenantWeb',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: (
        <TenantNewStylesWeb
          onPress={() => {
            setCurrentTab('account');
          }}
        />
      ),
    },
    {
      value: 'stylesTenantMobile',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: (
        <TenantNewStylesMobile
          onPress={() => {
            setCurrentTab('stylesTenantWeb');
          }}
        />
      ),
    },
    {
      value: 'stylesPreview',
      icon: <Iconify icon={'fluent:preview-link-24-filled'} width={20} height={20} />,
      component: (
        <TenantNewPreview
          onPress={() => {
            setCurrentTab('stylesTenantWeb');
          }}
        />
      ),
    },
  ];
  return (
    <Page title="User: Create a new Tenant">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Tenant"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Tenant', href: PATH_DASHBOARD.tenant.list },
            { name: 'New Tenant' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
