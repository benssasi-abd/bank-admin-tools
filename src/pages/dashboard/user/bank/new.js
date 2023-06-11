import { useState, useEffect } from 'react';

import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// hooks
import useTabs from '../../../../hooks/useTabs';
// components
import Iconify from '../../../../components/Iconify';
// ----------------------------------------------------------------------
import { useSelector } from '../../../../redux/store';
// sections
import { AccountGeneral, AccountStyles } from '../../../../sections/@dashboard/user/bank/account';
UserCreate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();

  const { style} = useSelector((state) => state.style);

  const { currentTab,  setCurrentTab } = useTabs('');
 

    useEffect(() => {
      setCurrentTab(style.currentTabU);
      // console.log(style.currentTabU, 'currentTabUstyle');
    }, [currentTab]);


  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: (
        <AccountGeneral
          onPress={() => {
            setCurrentTab('styles');
          }}
        />
      ),
    },
    {
      value: 'styles',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: (
        <AccountStyles
          onPress={() => {
            setCurrentTab('general');
          }}
        />
      ),
    },
  ];

  return (
    <Page title="User: Create a new Bank">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Bank"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          // onChange={onChangeTab}
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
