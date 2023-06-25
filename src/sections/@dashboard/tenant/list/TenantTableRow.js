import PropTypes from 'prop-types';
import { useState } from 'react';

import axios from 'axios';
import fileDownload from 'js-file-download';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Box,
  Link,
  Button,
} from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

import moment from './../../../../lib/moment';
// ----------------------------------------------------------------------
import CONFIG from './../../../../app/apiConfig';
// ----------------------------------------------------------------------

const { API_BASE_URL, BASE_URL } = CONFIG;
const baseURL = `${API_BASE_URL}`;

TenantTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  handleChangeSt: PropTypes.func,
};

export default function TenantTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, handlechangeStatus }) {
  const theme = useTheme();

  const { name, theme_web, theme_mobile, theme_image, domain_banking_system, domain, environment, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
    console.log(`${BASE_URL}${theme_image.logo}`, 'theme_image');
    console.log(BASE_URL, 'baseURL');
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <Typography variant="subtitle2">{name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {domain}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {domain_banking_system}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Button
          variant="outlined"
          onClick={() => {
            onDownload(environment, `${name}_environment.env`);
          }}
        >
          Click To download
        </Button>
      </TableCell>

      <TableCell align="left">
        {<Avatar variant="rounded" alt={name} src={theme_image ? `${BASE_URL}${theme_image.logo}` : null} />}
      </TableCell>

      <TableCell align="left">
        <Button
          variant="outlined"
          onClick={() => {
            onDownload(theme_web, `${name}_theme_web.json`);
          }}
        >
          Click To download
        </Button>
      </TableCell>

      <TableCell align="left">
        <Button
          variant="outlined"
          // color="success"
          onClick={() => {
            onDownload(theme_mobile, `${name}_theme_mobile.json`);
          }}
        >
          Click To download
        </Button>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {moment(created_at).format('YYYY-MM-DD')}
      </TableCell>

      {/* <TableCell align="center">
        <Iconify
          icon={(status === 'Pending' && 'eva:clock-outline') || 'eva:checkmark-circle-fill'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(status === 'Pending' && { color: 'warning.main' }),
          }}
        />
      </TableCell> */}
      {/* 
      <TableCell align="left">
        <Box>
          <FormControlLabel
            control={<Switch checked={status == 'Active'} onChange={handlechangeStatus} name="antoine" />}
            label=""
          />

          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={(status === 'Banned' && 'error') || (status === 'Pending' && 'warning') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Label>
        </Box>
      </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {onDeleteRow && (
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
              )}
              {onEditRow && (
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  Edit
                </MenuItem>
              )}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
