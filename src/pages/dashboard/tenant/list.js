import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// _mock_
import { _userList } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableLoading,
} from '../../../components/table';
// sections
import { TenantTableRow, TenantTableToolbar } from '../../../sections/@dashboard/tenant/list';
// store
import { useDispatch, useSelector } from './../../../redux/store';
// redux
import { listTenants, deleteTenant, changeStatus } from './../../../redux/tenant';
import { updateStyleColumn, updateInitialState } from './../../../redux/style';

import { ConfirmDialog } from '../../../components/animate';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'banned'];

const ROLE_OPTIONS = [
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'logo_white', label: 'logo white', align: 'left' },
  { id: 'logo_black', label: 'logo black', align: 'left' },
  { id: 'icon', label: 'icon', align: 'left' },
  { id: 'theme_web', label: 'file web', align: 'left' },
  { id: 'theme_mobile', label: 'file mobile', align: 'left' },
  { id: 'created_at', label: 'Creation date', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

UserList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
// ----------------------------------------------------------------------

export default function UserList() {
  const dispatch = useDispatch();

  const { tenants, isLoading, error } = useSelector((state) => state.tenant);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const [tableData, setTableData] = useState(tenants);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [currantRow, setcurrantRow] = useState();

  const [isOpen, setOpen] = useState(false);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    try {
      setcurrantRow(id);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletaAccount = (id) => {
    try {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setSelected([]);
      setTableData(deleteRow);
      dispatch(deleteTenant(id));
      onClose();
    } catch (error) {
      console.log(error);
      onClose();
    }
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };
  const handlechangeStatus = (id, status) => {
    let payload = {
      id,
      type: status === 'Active' ? 'BLOCK' : 'UNBLOCK',
    };
    dispatch(changeStatus(payload));
    dispatch(listTenants());
  };

  

    const restall = () => {
      console.log('updateInitialState');

      dispatch(updateStyleColumn([], 'logo'));
      dispatch(updateStyleColumn([], 'logo_white'));
      dispatch(updateStyleColumn([], 'bg_mobile_p'));
      dispatch(updateStyleColumn('', 'black_logo'));
      dispatch(updateStyleColumn('', 'black_logo'));
      dispatch(updateStyleColumn([], 'theme_object'));
      dispatch(updateStyleColumn('account', 'currentTabTenant'));
      dispatch(updateStyleColumn('', 'bg_mobile'));
      push(PATH_DASHBOARD.tenant.new);
  };
  
  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(listTenants());
  }, [dispatch]);

  useEffect(() => {
    setTableData(tenants);
  }, [tenants]);

  return (
    <Page title="Tenant: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Tenant List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Tenant', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
          action={
            // <NextLink href={PATH_DASHBOARD.tenant.new} passHref>
            <Button
              onClick={() => {
                restall();
              }}
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Tenant
            </Button>
            // </NextLink>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          />

          <Divider />

          <TenantTableToolbar
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {isLoading ? (
                    <TableLoading isloading={isLoading} />
                  ) : (
                    dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TenantTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          handlechangeStatus={() => handlechangeStatus(row.id, row.status)}
                        />
                      ))
                  )}

                  {isNotFound && <TableNoData isNotFound={isNotFound} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <ConfirmDialog
            title="Delete Admin?"
            open={isOpen}
            setClose={onClose}
            setOpen={onOpen}
            onConfirm={() => {
              handleDeletaAccount(currantRow);
            }}
          >
            Are you sure you want to delete this Admin?
          </ConfirmDialog>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            {/* <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            /> */}
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'all') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
