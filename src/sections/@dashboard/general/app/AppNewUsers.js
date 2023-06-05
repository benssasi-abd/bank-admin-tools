import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Rating, CardHeader, Typography, Stack } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
// import { _appRelated } from '../../../../_mock';

import _mock from '../../../../_mock/_mock';

// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------
// redux
import { useDispatch, useSelector } from './../../../../redux/store';
import { listTenants } from './../../../../redux/tenant';


const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  padding: theme.spacing(3),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
}));

export default function AppNewUsers() {
  const dispatch = useDispatch();
  const { tenants, isLoading } = useSelector((state) => state.tenant);
  
  const [_appNewTenants, setnewTenants] = useState([]);



  useEffect(() => {
    dispatch(listTenants('$limit=5'));
    console.log(isLoading, 'isLoading');
  }, [dispatch]);


    useEffect(() => {
      setnewTenants(tenants);
       console.log(tenants, 'tenants');
    }, [tenants]);


  return (
    <Card>
      <CardHeader title="New 5 Tenants" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_appNewTenants.map((app) => (
            <ApplicationItem key={app.id} app={app} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    review: PropTypes.number,
    shortcut: PropTypes.string,
    url: PropTypes.string,
  }),
};



function ApplicationItem({ app }) {
  const theme = useTheme();
  const { shortcut, logo_black, domain, price, status, review, name } = app;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Image src={logo_black ? logo_black : ''} alt={name} sx={{ width: 50, height: 50 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Iconify width={25} height={25} icon={'logos'} />
          <Typography variant="caption" sx={{ ml: 0.5, mr: 1 }}>
            {domain}
          </Typography>
        </Stack>
      </Box>

      {/* <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        <Label variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'} color={status === 1 ? 'success' : 'error'}>
          {status === 1 ? 'Active' : 'Banned'}
        </Label>
      </Stack> */}
    </Stack>
  );
}
