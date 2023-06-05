import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useState, useCallback, useEffect } from 'react';
// next
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
// @mui
import {
  Box,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
// config
import { ICON } from '../../config';
import { RHFUploadAvatar, FormProvider } from './../hook-form';
// redux
import { useDispatch } from './../../redux/store';
import { updateStyleColumn } from './../../redux/style';
import { PATH_DASHBOARD } from './../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
//
import Logo from '../Logo';
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import { fData } from './../../utils/formatNumber';
import { api } from './../../api';

// config
import { NAVBAR } from '../../config';
import CustomSettingColorPresets from './../../components/settings/CustomSettingColorPresets';
// ----------------------------------------------------------------------

MenuStyle.propTypes = {
  navConfig: PropTypes.array,
  navbar: PropTypes.object,
};

export default function MenuStyle({ navConfig, navbar }) {
  const { pathname, push } = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const { themeColorPresets, onChangeColor, colorOption } = useSettings();

  const [color, setColor] = useColor('hex', '#121212');

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({});

  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
  });

  const onSubmit = async () => {
    // try {
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (openDrawer) {
      handleDrawerClose();
    }
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
    dispatch(updateStyleColumn('70%', 'width'));
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    dispatch(updateStyleColumn('100%', 'width'));
  };

  async function handleCreateFile(payload, field) {
    try {
      let fileInfo = new FormData();
      fileInfo.append('file', payload);
      const { data } = await api.post('/users/file', fileInfo);
      let t = 'login_page';
      if (field == 'logo') {
        t = 'avatar';
      }
      dispatch(updateStyleColumn(data.id, t));
      enqueueSnackbar('Update success!');
      console.log(data, 'data');
    } catch (error) {
      console.log(error, 'errro');
    }
  }

  const handleDrop = useCallback((acceptedFiles) => {
    const _file = acceptedFiles[0];

    if (_file) {
      setValue(
        'photoURL',
        Object.assign(_file, {
          preview: URL.createObjectURL(_file),
        })
      );
      dispatch(
        updateStyleColumn(
          Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          }),
          'logo'
        )
      );

      handleCreateFile(_file, 'logo');
    }
  }, []);

  const handleDropPagelogin = useCallback((acceptedFiles) => {
    const _file = acceptedFiles[0];

    if (_file) {
      setValue(
        'pagelogin',
        Object.assign(_file, {
          preview: URL.createObjectURL(_file),
        })
      );

      dispatch(
        updateStyleColumn(
          Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          }),
          'pagelogin'
        )
      );
      handleCreateFile(_file, 'pagelogin');
    }
  }, []);

  const handleChangeColor = (color) => {
    let _color = color.hex;
    console.log(_color, 'setColor');
    setColor(color);
    dispatch(updateStyleColumn(_color, 'colorText'));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Button
        variant="contained"
        onClick={handleDrawerOpen}
        sx={{
          borderRadius: '50px',
          height: '40px',
          position: 'fixed',
          bottom: '10px',
          right: '15px',
          zIndex: 999,
          textAlign: 'center',
        }}
        startIcon={<Iconify width={25} height={25} icon={'uiw:setting'} />}
      >
        Setting
      </Button>

      <Drawer
        anchor={'right'}
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            backgroundColor: 'linear-gradient(75deg, rgb(255 255 255 / 0%) 0%, rgb(255 255 255 / 0%) 100%)',
            pb: 5,
            width: navbar.DASHBOARD_WIDTH + 100,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />
          <Typography variant="h6" sx={{ px: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box component={Iconify} icon={'uiw:setting'} sx={{ mr: 1, width: 24, height: 24 }} /> Settings
          </Typography>
          <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
            <CardHeader title="Logo" />
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={10145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(10145728)}
                </Typography>
              }
            />
          </Card>
          <Card sx={{ py: 3, px: 3, textAlign: 'center', mt: 2 }}>
            <CardHeader title="Page Login " />
            <RHFUploadAvatar
              name="pagelogin"
              accept="image/*"
              maxSize={10145728}
              onDrop={handleDropPagelogin}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(10145728)}
                </Typography>
              }
            />
          </Card>

          <Card sx={{ minWidth: 275, mt: 2 }}>
            <CardHeader title="Theme Colors" />
            <CardContent>
              <Stack spacing={1.5}>
                <CustomSettingColorPresets onChangeTheme={handleChangeColor} />
              </Stack>
            </CardContent>
          </Card>
          {/* <Card sx={{ minWidth: 275 }}>
            <CardHeader title="Theme Colors" />
            <CardContent>
              <Box sx={{ textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <ColorPicker
                  width={navbar.DASHBOARD_WIDTH + 100}
                  height={150}
                  color={color}
                  onChange={handleChangeColor}
                  hideHSV
                  hideRGB
                  dark
                />
              </Box>
            </CardContent>
          </Card> */}
          <Box sx={{ mt: 2, textAlign: 'center', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <LoadingButton
              fullWidth
              size="large"
              sx={{
                width: '70%',
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={() => {
                dispatch(updateStyleColumn('styles', 'currentTabU'));
                dispatch(updateStyleColumn('100%', 'width'));
                Cookies.set('themeColorPresets', 'default', {
                  expires: 3,
                });
                push(PATH_DASHBOARD.user.banknew);
              }}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Scrollbar>
      </Drawer>
    </FormProvider>
  );
}

// ----------------------------------------------------------------------

ParentItem.propTypes = {
  hasSub: PropTypes.bool,
  icon: PropTypes.any,
  title: PropTypes.string,
};

function ParentItem({ icon, title, hasSub, ...other }) {
  return (
    <ListItemButton sx={{ textTransform: 'capitalize', height: 44 }} {...other}>
      <ListItemIcon sx={{ width: 22, height: 22 }}>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ typography: 'body2' }}>{title}</ListItemText>
      {hasSub && <Box component={Iconify} icon={'eva:arrow-ios-forward-fill'} />}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

SubMenu.propTypes = {
  parent: PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.any,
    path: PropTypes.string,
    children: PropTypes.array,
  }),
  pathname: PropTypes.string,
};

function SubMenu({ parent, pathname }) {
  const [open, setOpen] = useState(false);
  const { title, icon, path, children } = parent;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem title={title} icon={icon} onClick={handleOpen} hasSub />

        <Drawer
          open={open}
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH - 12 } }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleClose}>
              <Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />
            </IconButton>
            <Typography noWrap variant="subtitle1" sx={{ ml: 1, textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: 'text.secondary' }}
                      noWrap
                    >
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <NextLink key={link.title} href={link.path} passHref>
                        <ListItemButton sx={{ px: 1.5 }}>
                          <ListItemIcon
                            sx={{
                              mr: 0.5,
                              width: ICON.NAVBAR_ITEM,
                              height: ICON.NAVBAR_ITEM,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                bgcolor: 'currentColor',
                                borderRadius: '50%',
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={link.title}
                            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                          />
                        </ListItemButton>
                      </NextLink>
                    ))}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </>
    );
  }

  return (
    <NextLink href={path} passHref>
      <ParentItem title={title} icon={icon} />
    </NextLink>
  );
}
