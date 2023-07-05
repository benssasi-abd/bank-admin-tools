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
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
// utils
import { fData } from '../../../../utils/formatNumber';
// config
import CONFIG from './../../../../app/apiConfig';
import mobileTheme from './../../../../theme/mobile/index.json';

// redux
import { updateStyleColumn, handleCreateFile } from './../../../../redux/style';
import { createTenant } from '../../../../redux/tenant';

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

TenantNewStylesMobile.propTypes = {
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
export default function TenantNewStylesMobile({ isEdit = false, currentUser, onPress }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { currenttenant } = useSelector((state) => state.tenant);

  const { style, isLoading } = useSelector((state) => state.style);

  const { enqueueSnackbar } = useSnackbar();

  const [_mobileTheme, setwebTheme] = useState(style.theme_object?.mobile || mobileTheme || []);

  const [_keyColor, setColorKey] = useState('');
  const [_valColor, setColorval] = useState('#fff');

  const [color, setColor] = useColor('hex', '#7A0C2E');

  const [open, setOpen] = useState(false);

  const handleOpen = (keyColor, valColor) => {
    setColorKey(keyColor);

    setColorval(valColor);

    setColor({ ...color, hex: valColor });

    setOpen(true);
  };

  const handleClose = (key) => {
    setOpen(false);
    setwebTheme({ ..._mobileTheme, [_keyColor]: color.hex });
  };

  const NewTenantSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      _mobileTheme,
      bg_mobile_p: style?.bg_mobile_p || [],
    }),
    [currenttenant]
  );
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
    // setwebTheme(mobileTheme);
    // if (isEdit && currentUser) {
    //   reset(defaultValues);
    // }
    // if (!isEdit) {
    //   reset(defaultValues);
    // }
  }, [currentUser]);

  const uploadFile = (data, field) => {
    dispatch(handleCreateFile(data, field, true));
  };

  const onSubmit = async (data) => {
    try {
      dispatch(updateStyleColumn('stylesPreview', 'currentTabTenant'));
      dispatch(
        updateStyleColumn(
          { mobile: _mobileTheme, web: style.theme_object.web, imgPreview: style.theme_object.imgPreview },
          'theme_object'
        )
      );
      uploadFile(_mobileTheme, 'theme_mobile');
      onPress();
      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevious = async () => {
    try {
      dispatch(updateStyleColumn('stylesTenantWeb', 'currentTabTenant'));
      onPress();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextChange = (e, key) => {
    const el = e.target;
    setwebTheme({ ..._mobileTheme, [key]: el.value });
    console.log(_mobileTheme, '_mobileTheme');
  };

  const editColors = () => {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={styleModal}>
            <Box sx={{ p: 3, alignItems: 'center' }}>
              <Typography id="transition-modal-title" variant="h4" component="h1">
                Change Theme Color
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }}>
                choose The
                <Label color="info" sx={{ ml: 1, mr: 1, backgroundColor: _valColor }}>
                  {_keyColor}
                </Label>
                color
              </Typography>
              <ColorPicker
                width={560}
                height={200}
                color={color}
                onChange={setColor}
                alpha
                hideHSV
                // hideHEX
                hideRGB
                dark
              />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton onClick={handleClose} type="submit" variant="contained" loading={isSubmitting}>
                {'Save Change'}
              </LoadingButton>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    );
  };

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
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${isString(style.bg_mobile_p) ? style.bg_mobile_p : style.bg_mobile_p.preview})`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                top: 50,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {style.theme_object.imgPreview.black ? (
                <Image
                  visibleByDefault
                  disabledEffect
                  sx={{
                    width: 120,
                    // mixBlendMode: 'multiply'
                  }}
                  src={
                    isString(style.theme_object.imgPreview.black)
                      ? style.theme_object.imgPreview.black
                      : style.theme_object.imgPreview.black.preview
                  }
                  // src={isString(style.logo) ? style.logo : style.logo.preview}
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
                sx={{ ...btncontainer, borderColor: _mobileTheme['main'], color: _mobileTheme['main'] }}
                variant="outlined"
              >
                ENTRAR
              </Button>
              <Button
                sx={{ ...btncontainer, backgroundColor: _mobileTheme['main'], color: _mobileTheme['text'] }}
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

  const handleDrop_bg_mobile = useCallback(
    (acceptedFiles) => {
      const _file = acceptedFiles[0];
      if (_file) {
        setValue(
          'bg_mobile_p',
          Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          })
        );
      }
      dispatch(
        updateStyleColumn(
          Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          }),
          'bg_mobile_p'
        )
      );
      dispatch(handleCreateFile(_file, 'bg_mobile'));
    },

    []
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography id="transition-modal-title" variant="h5" component="h1">
              Mobile Theme
            </Typography>

            <Box
              sx={{
                marginTop: 4,
                display: 'grid',
                columnGap: 2,
                rowGap: 2,
                gridTemplateColumns: 'auto auto',
              }}
            >
              <Box>
                <Box
                  sx={{
                    marginBottom: 5,
                  }}
                >
                  <RHFUploadAvatar
                    name="bg_mobile_p"
                    accept="image/*"
                    maxSize={10145728}
                    onDrop={handleDrop_bg_mobile}
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
                </Box>
                {_mobileTheme &&
                  Object.keys(_mobileTheme).map((keyColor, i) => (
                    <Box
                      key={i}
                      sx={{
                        marginBottom: 4,
                        display: 'grid',
                        columnGap: 2,
                        rowGap: 3,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                      }}
                    >
                      <RHFTextField
                        onChange={(e) => {
                          handleTextChange(e, keyColor);
                        }}
                        key={keyColor}
                        name={keyColor}
                        value={_mobileTheme[keyColor]}
                        label={_mobileTheme[keyColor]}
                        placeholder={keyColor}
                      />
                      <Button
                        sx={{
                          color: '#b7b3a9',
                          border: '2px solid #b7b3a9',
                          backgroundColor: _mobileTheme[keyColor],
                        }}
                        onClick={() => {
                          handleOpen(keyColor, _mobileTheme[keyColor]);
                        }}
                      >
                        choose the color {keyColor}
                      </Button>
                    </Box>
                  ))}
              </Box>
              {editColors()}
              <Box sx={{ backgroundColor: '#ccc', padding: 2, borderRadius: 1 }}>{skin_phone()}</Box>
            </Box>

            <Box sx={{ py: 3, px: 3, textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
              <LoadingButton type="button" onClick={handlePrevious} variant="contained" loading={isSubmitting}>
                previous
              </LoadingButton>
              <LoadingButton onClick={onsubmit} type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Next Step' : 'Save Changes'}
              </LoadingButton>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
