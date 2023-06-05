import PropTypes from 'prop-types';
import { useState } from 'react';
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
  Box
} from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

import moment from './../../../../lib/moment';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  handleChangeSt: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, handlechangeStatus }) {
  const theme = useTheme();

  const { name, avatarUrl, company, role, isVerified, status, email, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {moment(created_at).format('YYYY-MM-DD')}
      </TableCell>

      <TableCell align="center">
        <Iconify
          icon={(status === 'Pending' && 'eva:clock-outline') || 'eva:checkmark-circle-fill'}
          sx={{
            width: 20,
            height: 20,
            color: 'success.main',
            ...(status === 'Pending' && { color: 'warning.main' }),
          }}
        />
      </TableCell>

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
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
             {onDeleteRow && <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>}
              {onEditRow && <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>}
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
