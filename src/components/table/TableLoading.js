// @mui
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
//
// import EmptyContent from '../EmptyContent';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

TableLoading.propTypes = {
  isNotFound: PropTypes.bool,
};

export default function TableLoading({ isloading }) {
  return (
    <>
      {isloading ? (
        <TableRow>
          <TableCell colSpan={9}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
