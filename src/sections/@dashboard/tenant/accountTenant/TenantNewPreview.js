import PropTypes from 'prop-types';
import { snakeCase } from 'change-case';
import isString from 'lodash/isString';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
import Iconify from '../../../../components/Iconify';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../redux/store';
// components
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// config
import CONFIG from './../../../../app/apiConfig';
import mobileTheme from './../../../../theme/mobile/index.json';

// redux
import { updateStyleColumn, handleCreateFile } from './../../../../redux/style';
import { createTenant, setCurrentTenant } from '../../../../redux/tenant';

// styles
import {
  device,
  screen,
  btnvolume,
  btnvolumeup,
  btnpower,
  btnback,
  btnhome,
  btnburger,
  footer,
  display,
  camera,
  detector,
  header,
  btnpoweract,
  btnvolumedown,
  btncontainer,
  wrapper,
} from './style';
// ----------------------------------------------------------------------

const { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;

TenantNewPreview.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 2,
  borderRadius: 2,
  p: 4,
};
export default function TenantNewPreview({ isEdit = false, currentUser, onPress }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { currenttenant } = useSelector((state) => state.tenant);

  const { style, isLoading } = useSelector((state) => state.style);

  const { enqueueSnackbar } = useSnackbar();

  const [_objTheme, setThemeObj] = useState([]);

  const NewTenantSchema = Yup.object().shape({});

  const defaultValues = useMemo(() => _objTheme, [currenttenant]);

  const methods = useForm({
    resolver: yupResolver(NewTenantSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    setThemeObj(style.theme_object);
  }, [_objTheme]);

  const uploadFile = async (data, field) => {
    dispatch(handleCreateFile(data, field, true));
  };

  const onSubmit = async (data) => {
    try {
      let payload = {
        client_secret: client_secret,
        client_id: client_id,
        name: currenttenant?.name,
        key: snakeCase(currenttenant?.name),
        domain: currenttenant?.domain,
        theme_image: style?.login_page,
        theme_mobile: style?.theme_mobile,
        theme_web: style?.theme_web,
        environment: style?.environment,
        domain_banking_system: currenttenant?.domain_api,
      };


      // create New Tenant

      dispatch(createTenant(payload));
      dispatch(setCurrentTenant({}));

      // Go to table Tenant
      push(PATH_DASHBOARD.tenant.list);

      onPress();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevious = async () => {
    try {
      dispatch(updateStyleColumn('stylesTenantMobile', 'currentTabTenant'));
      onPress();
    } catch (error) {
      console.error(error);
    }
  };

  // show skin phone after custom colors

  const skin_phone = () => {
    return (
      <Box sx={wrapper}>
        <Box sx={device}>
          <Box sx={screen}></Box>
          <Box sx={{ ...btnvolume, ...btnvolumeup }}></Box>
          <Box sx={{ ...btnvolume, ...btnvolumedown }}></Box>
          <Box sx={btnpower}>
            <Box sx={btnpoweract}></Box>
          </Box>
          <Box sx={header}>
            <Box sx={detector}></Box>
            <Box sx={camera}></Box>
          </Box>
          <Box
            sx={{
              ...display,
              backgroundImage: `url(${isString(style.bg_mobile_p) ? style.bg_mobile_p : style.bg_mobile_p.preview})`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                top: 80,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {style.theme_object.imgPreview.logo ? (
                <Image
                  visibleByDefault
                  disabledEffect
                  sx={{
                    width: 120,
                    // mixBlendMode: 'multiply'
                  }}
                  src={
                    isString(style.theme_object.imgPreview.logo)
                      ? style.theme_object.imgPreview.logo
                      : style.theme_object.imgPreview.logo.preview
                  }
                  alt="login"
                />
              ) : (
                ''
              )}
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                bottom: 0,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginBottom: 2,
              }}
            >
              <Button
                sx={{
                  ...btncontainer,
                  borderColor: style.theme_object?.mobile['main'],
                  color: style.theme_object?.mobile['main'],
                }}
                variant="outlined"
              >
                ENTRAR
              </Button>
              <Button
                sx={{
                  ...btncontainer,
                  backgroundColor: style.theme_object?.mobile['main'],
                  color: style.theme_object?.mobile['text'],
                }}
                variant="outlined"
              >
                ABBIR UMA CONTA
              </Button>
            </Box>
          </Box>
          <Box sx={footer}>
            <Box sx={btnburger}></Box>
            <Box sx={btnhome}></Box>
            <Box sx={btnback}></Box>
          </Box>
        </Box>
      </Box>
    );
  };

  // show skin web after custom colors

  const skin_web = () => {
    return (
      <Box sx={{ backgroundColor: style.theme_object?.web['dark'], padding: 0.4, borderRadius: 1, height: '709px' }}>
        <Box
          sx={{
            backgroundColor: style.theme_object?.web['main'],
            padding: 2,
            color: '#fff',
            borderRadius: 1,
            margin: 1,
            display: 'flex',
            justifyItems: 'self-end',
            flexDirection: 'row',
          }}
        >
          {style.theme_object.imgPreview.logo ? (
            <Image
              visibleByDefault
              disabledEffect
              sx={{
                width: 40,
              }}
              src={
                isString(style.theme_object.imgPreview.logo)
                  ? style.theme_object.imgPreview.logo
                  : style.theme_object.imgPreview.logo.preview
              }
              alt="login"
            />
          ) : (
            ''
          )}
          <Box
            sx={{
              display: 'grid',
              justifyItems: 'self-end',
              alignItems: 'center',
              marginLeft: 2,
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                }}
              >
                <Iconify
                  sx={{
                    color: style.theme_object?.web['main'],
                  }}
                  icon={'heroicons:user-solid'}
                  width={50}
                  height={20}
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                  marginLeft: 1,
                }}
              >
                <Iconify
                  sx={{
                    color: style.theme_object?.web['main'],
                  }}
                  icon={'ep:tools'}
                  width={50}
                  height={20}
                />
              </Box>
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text'], marginLeft: 2 }} noWrap>
                Sair
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: style.theme_object?.web['light'],
            color: '#fff',
            margin: 1,
            mt: -2,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              padding: 1,
              display: 'flex',
              borderBottom: `2px solid ${style.theme_object?.web['main']}`,
            }}
          >
            <Iconify
              sx={{
                color: style.theme_object?.web['main'],
              }}
              icon={'material-symbols:dashboard-outline'}
              width={50}
              height={20}
            />
            <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 12 }} noWrap>
              DASHBOARD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: 1,
            }}
          >
            <Iconify
              sx={{
                color: style.theme_object?.web['main'],
              }}
              icon={'heroicons:users-solid'}
              width={50}
              height={20}
            />
            <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 12 }} noWrap>
              CLIENTES
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: style.theme_object?.web['light'],
            padding: 1,
            color: '#fff',
            borderRadius: 1,
            margin: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'] }} noWrap>
            Usuários
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: style.theme_object?.web['dark'],
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            // height: '70%',
          }}
        >
          <Box
            sx={{
              // backgroundColor: style.theme_object?.web['darker'],
              color: '#fff',
              borderRadius: 1,
              justifyContent: 'space-around',
              width: '100%',
              color: style.theme_object?.web['text'],
              display: 'flex',
            }}
          >
            <Box
              sx={{
                backgroundColor: style.theme_object?.web['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 11 }} noWrap>
                9
              </Typography>
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text'], fontSize: 11 }} noWrap>
                Usuários ativos
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: style.theme_object?.web['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 11 }} noWrap>
                91
              </Typography>
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text'], fontSize: 11 }} noWrap>
                Subcontas
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: style.theme_object?.web['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 11 }} noWrap>
                12
              </Typography>
              <Typography variant="body2" sx={{ color: style.theme_object?.web['text'], fontSize: 11 }} noWrap>
                Usuários Ap...
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: 1,
            color: '#fff',
            borderRadius: 1,
            height: '50%',
            width: '100%',
            marginTop: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: style.theme_object?.web['light'],
              color: '#fff',
              borderRadius: 1,
              height: '100%',
              width: '100%',
              padding: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: style.theme_object?.web['text_black'], fontSize: 14 }} noWrap>
              Total de Usuários IHold
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography id="transition-modal-title" variant="h5" component="h1">
              Preview Theme
            </Typography>
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={6} md={6}>
                  <Box sx={{ backgroundColor: '#ccc', padding: 2, borderRadius: 1 }}>{skin_phone()}</Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  {skin_web()}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ py: 3, px: 3, textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <LoadingButton type="button" onClick={handlePrevious} variant="contained" loading={isSubmitting}>
                previous
              </LoadingButton>
              <LoadingButton onClick={onsubmit} type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Submit' : 'Save Changes'}
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
