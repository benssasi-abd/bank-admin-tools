import PropTypes from 'prop-types';
import {
  camelCase,
} from 'change-case';
import isString from 'lodash/isString';

import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
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
import Iconify from '../../../../components/Iconify';

import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// config
import CONFIG from './../../../../app/apiConfig';
import webTheme from './../../../../theme/web/index.json';
// redux
import { updateStyleColumn, handleCreateFile } from './../../../../redux/style';
import { createTenant } from '../../../../redux/tenant';
// ----------------------------------------------------------------------

const { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;

TenantNewStylesWeb.propTypes = {
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
export default function TenantNewStylesWeb({ isEdit = false, currentUser, onPress }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { currenttenant } = useSelector((state) => state.tenant);

  const { style } = useSelector((state) => state.style);

  const { enqueueSnackbar } = useSnackbar();

  const [_webTheme, setwebTheme] = useState(style.theme_object?.web || webTheme || []);

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

  const NewTenantSchema = Yup.object().shape({});

  const defaultValues = useMemo(() => _webTheme, [currenttenant]);

  const methods = useForm({
    resolver: yupResolver(NewTenantSchema),
    defaultValues,
  });

  const handleClose = (key) => {
    setOpen(false);
    setwebTheme({ ..._webTheme, [_keyColor]: color.hex });
     dispatch(updateStyleColumn({ ...style.theme_object, web: _webTheme }, 'theme_object'));
  };

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
    // setwebTheme(webTheme);
    console.log(style.theme_object, 'style.theme_obje');
  }, []);

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const uploadFile = (data, field) => {
    dispatch(handleCreateFile(data, field, true));
  };

  const onSubmit = async (data) => {
    try {
      console.log(_webTheme, '_webTheme');
      console.log(style.avatar, 'style.avatar');

      dispatch(updateStyleColumn({ ...style.theme_object, web: _webTheme }, 'theme_object'));
      dispatch(updateStyleColumn('stylesTenantMobile', 'currentTabTenant'));
      uploadFile(_webTheme, 'theme_web');
      onPress();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrevious = async () => {
    try {
      dispatch(updateStyleColumn('account', 'currentTabTenant'));
      onPress();
    } catch (error) {
      console.error(error);
    }
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

  const skin_web = () => {
    return (
      <Box sx={{ backgroundColor: '#E2E8F0', padding: 0.4, borderRadius: 1, marginBottom: 5 }}>
        <Box
          sx={{
            backgroundColor: _webTheme['color_header'],
            padding: 2,
            color: '#fff',
            borderRadius: 1,
            margin: 1,
            display: 'flex',
            justifyItems: 'self-end',
            flexDirection: 'row',
          }}
        >
          {style.theme_object.imgPreview && style.theme_object.imgPreview.black ? (
            <Image
              visibleByDefault
              disabledEffect
              sx={{
                width: 35,
              }}
              src={
                isString(style.theme_object.imgPreview.black)
                  ? style.theme_object.imgPreview.black
                  : style.theme_object.imgPreview.black.preview
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
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  marginLeft: 1,
                }}
              >
                <Box
                  sx={{
                    borderLeft: `2px solid #fff`,
                    borderRight: `2px solid #fff`,
                    paddingRight: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: _webTheme['color_header_text'], marginLeft: 2, fontSize: 10 }}
                    noWrap
                  >
                    Olá, Eduardo Paiva
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: _webTheme['color_header_text'], marginLeft: 2, fontSize: 10 }}
                    noWrap
                  >
                    123456789-09
                  </Typography>
                </Box>

                <Box
                  sx={{
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
                      color: _webTheme['light'],
                    }}
                    icon={'ep:tools'}
                    width={40}
                    height={10}
                  />
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: _webTheme['color_header_text'], marginLeft: 2, fontSize: 10 }}
                noWrap
              >
                Sair
              </Typography>
              <Box
                sx={{
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
                    color: '#fff',
                  }}
                  icon={'mdi:logout'}
                  width={40}
                  height={10}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
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
              borderBottom: `2px solid ${_webTheme['color_header']}`,
            }}
          >
            <Iconify
              sx={{
                color: _webTheme['icon_color_primary'],
              }}
              icon={'iconamoon:home-duotone'}
              width={45}
              height={15}
            />
            <Typography variant="body2" sx={{ color: _webTheme['color_header'], fontSize: 10 }} noWrap>
              HOME
            </Typography>
          </Box>
          <Box
            sx={{
              padding: 1,
              display: 'flex',
              // borderBottom: `2px solid ${_webTheme['color_header']}`,
            }}
          >
            <Iconify
              sx={{
                color: _webTheme['icon_color_primary'],
              }}
              icon={'ion:card-outline'}
              width={45}
              height={15}
            />
            <Typography variant="body2" sx={{ color: _webTheme['color_header'], fontSize: 10 }} noWrap>
              CARTÕES
            </Typography>
          </Box>
          <Box
            sx={{
              padding: 1,
              display: 'flex',
              // borderBottom: `2px solid ${_webTheme['color_header']}`,
            }}
          >
            <Iconify
              sx={{
                color: _webTheme['icon_color_primary'],
              }}
              icon={'uiw:qrcode'}
              width={45}
              height={15}
            />
            <Typography variant="body2" sx={{ color: _webTheme['color_header'], fontSize: 10 }} noWrap>
              PAGAMENTOS
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
                color: _webTheme['icon_color_primary'],
              }}
              icon={'bx:file'}
              width={45}
              height={15}
            />
            <Typography variant="body2" sx={{ color: _webTheme['color_header'], fontSize: 10 }} noWrap>
              EXTRATOS
            </Typography>
          </Box>
        </Box>

        {/* <Box
          sx={{
            backgroundColor: _webTheme['dark'],
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%',
            // height: '70%',
          }}
        >
          <Box
            sx={{
              // backgroundColor: _webTheme['darker'],
              color: '#fff',
              borderRadius: 1,
              justifyContent: 'space-around',
              width: '100%',
              color: _webTheme['text'],
              display: 'flex',
            }}
          >
            <Box
              sx={{
                backgroundColor: _webTheme['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 11 }} noWrap>
                9
              </Typography>
              <Typography variant="body2" sx={{ color: _webTheme['text'], fontSize: 11 }} noWrap>
                Usuários ativos
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: _webTheme['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 11 }} noWrap>
                91
              </Typography>
              <Typography variant="body2" sx={{ color: _webTheme['text'], fontSize: 11 }} noWrap>
                Subcontas
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: _webTheme['light'],
                justifyContent: 'center',
                borderRadius: 1,
                padding: 1,
                minWidth: '30%',
              }}
            >
              <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 11 }} noWrap>
                12
              </Typography>
              <Typography variant="body2" sx={{ color: _webTheme['text'], fontSize: 11 }} noWrap>
                Usuários Ap...
              </Typography>
            </Box>
          </Box>
        </Box> */}
        <Box
          sx={{
            padding: 1,
            color: '#fff',
            borderRadius: 1,
            height: '50%',
            width: '100%',
            marginTop: 1,
            display: 'flex',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fff',
              color: '#fff',
              borderRadius: 1,
              height: '80%',
              width: '70%',
              padding: 2,
              marginRight: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 10 }} noWrap>
              REGISTRO DE EVENTOS
            </Typography>
            <Box
              sx={{
                padding: 1,
                display: 'flex',
              }}
            >
              <Box
                sx={{
                  marginRight: 1,
                  backgroundColor: _webTheme['button_color_secundary'],
                  borderRadius: 50,
                  padding: '5px 1rem',
                }}
              >
                <Typography variant="body2" sx={{ color: '#fff', fontSize: 9 }} noWrap>
                  7 dias
                </Typography>
              </Box>
              <Box
                sx={{
                  marginRight: 1,
                  backgroundColor: _webTheme['main'],
                  borderRadius: 50,
                  padding: '5px 1rem',
                  border: `1px solid ${_webTheme['button_color_secundary']}`,
                }}
              >
                <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                  15 dias
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                marginRight: 1,
                padding: '5px 1rem',
                display: 'flex',
                backgroundColor: '#E2E8F0',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                DATA
              </Typography>
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                TIPO
              </Typography>
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                NOME
              </Typography>
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                VALOR
              </Typography>
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                COMPROVANTE
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: '#fff',
              color: '#fff',
              borderRadius: 1,
              height: '80%',
              width: '30%',
              padding: 1,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 10 }} noWrap>
                MAIS ACESSADOS
              </Typography>
              <Box
                sx={{
                  // marginRight: 1,
                  // padding: '5px 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 1,
                }}
              >
                <Box
                  sx={{
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1);',
                    border: `2px solid ${_webTheme['text']}`,
                    borderRadius: 1,
                    padding: 1,
                    marginRight: 1,
                    width: '50%',
                    '&:hover': {
                      bgcolor: _webTheme['color_hover'],
                    },
                  }}
                >
                  <Iconify
                    sx={{
                      color: _webTheme['icon_color_secondary'],
                    }}
                    icon={'bx:file'}
                    height={15}
                  />
                  <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                    Pix
                  </Typography>
                </Box>
                <Box
                  sx={{
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1);',
                    border: `2px solid ${_webTheme['text']}`,
                    borderRadius: 1,
                    padding: 1,
                    width: '50%',
                    '&:hover': {
                      bgcolor: _webTheme['color_hover'],
                    },
                  }}
                >
                  <Iconify
                    sx={{
                      color: _webTheme['icon_color_secondary'],
                    }}
                    icon={'bx:file'}
                    height={15}
                  />
                  <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                    Ted
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  // marginRight: 1,
                  // padding: '5px 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 1,
                }}
              >
                <Box
                  sx={{
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1);',
                    border: `2px solid ${_webTheme['text']}`,
                    borderRadius: 1,
                    padding: 1,
                    marginRight: 1,
                    width: '50%',
                    '&:hover': {
                      bgcolor: _webTheme['color_hover'],
                    },
                  }}
                >
                  <Iconify
                    sx={{
                      color: _webTheme['icon_color_secondary'],
                    }}
                    icon={'bx:file'}
                    height={15}
                  />
                  <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                    Extrato
                  </Typography>
                </Box>
                <Box
                  sx={{
                    boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1);',
                    border: `2px solid ${_webTheme['text']}`,
                    borderRadius: 1,
                    padding: 1,
                    width: '50%',
                    '&:hover': {
                      bgcolor: _webTheme['color_hover'],
                    },
                  }}
                >
                  <Iconify
                    sx={{
                      color: _webTheme['icon_color_secondary'],
                    }}
                    icon={'ph:info'}
                    height={15}
                  />
                  <Typography variant="body2" sx={{ color: '#070A0E', fontSize: 9 }} noWrap>
                    Dúvidas
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#fff', marginTop: '-3rem', borderRadius: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '70%', padding: '1rem 2rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 50,
                  marginRight: 1,
                }}
              >
                {style.theme_object.imgPreview && style.theme_object.imgPreview.black ? (
                  <Image
                    visibleByDefault
                    disabledEffect
                    sx={{
                      width: 35,
                    }}
                    src={
                      isString(style.theme_object.imgPreview.black)
                        ? style.theme_object.imgPreview.black
                        : style.theme_object.imgPreview.black.preview
                    }
                    alt="login"
                  />
                ) : (
                  ''
                )}
                <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 11 }} noWrap>
                  INTERNET BANKING
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                  marginTop: 3,
                }}
              >
                <Iconify
                  sx={{
                    color: '#2E4EFF',
                    marginRight: 1,
                  }}
                  icon={'iconamoon:home-duotone'}
                />
                <Typography variant="body2" sx={{ color: '#2E4EFF', fontSize: 10 }} noWrap>
                  HOME DO SITE
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 10 }} noWrap>
                  ACESSAR MINHA CONTA
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 3,
                  borderBottom: `2px solid #ccc`,
                  marginRight: 5,
                }}
              >
                <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 10 }} noWrap>
                  CPF
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: _webTheme['text_black'], fontSize: 10, marginBottom: 1 }}
                  noWrap
                >
                  000.000.000-00
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 3,
                  borderBottom: `2px solid #ccc`,
                  marginRight: 5,
                  backgroundColor: _webTheme['button_color_primary'],
                  borderRadius: 50,
                  textAlign: 'center',
                  '&:hover': {
                    bgcolor: _webTheme['button_color_primary_hover'],
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: '#fff', fontSize: 10, padding: 1 }} noWrap>
                  ENTRAR
                </Typography>
              </Box>
              <Box
                sx={{
                  marginTop: 1,
                  border: `1px solid ${_webTheme['button_color_primary']}`,
                  marginRight: 5,
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: _webTheme['text_black'], fontSize: 10, padding: 1 }} noWrap>
                  ABRIR CONTA
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '30%', padding: '0rem' }}>
              {style.theme_object.imgPreview && style.theme_object.imgPreview.image_right ? (
                <Image
                  visibleByDefault
                  disabledEffect
                  // ratio="1/1"
                  sx={{
                    height: '100%',
                    width: '100%',
                  }}
                  src={
                    isString(style.theme_object.imgPreview.image_right)
                      ? style.theme_object.imgPreview.image_right
                      : style.theme_object.imgPreview.image_right.preview
                  }
                  alt="login"
                />
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const handleTextChange = (e, key) => {
    const el = e.target;
    setwebTheme({ ..._webTheme, [key]: el.value })
    dispatch(updateStyleColumn({ ...style.theme_object, web: _webTheme }, 'theme_object'));;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Typography id="transition-modal-title" variant="h5" component="h1">
              Web Theme
            </Typography>
            <Box
              sx={{
                marginTop: 4,
                display: 'grid',
                columnGap: 3,
                rowGap: 4,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Box>
                {_webTheme &&
                  Object.keys(_webTheme).map((keyColor, i) => (
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
                        value={_webTheme[keyColor]}
                        label={_webTheme[keyColor]}
                        placeholder={keyColor}
                      />
                      <Button
                        sx={{
                          color: '#b7b3a9',
                          border: '2px solid #b7b3a9',
                          backgroundColor: _webTheme[keyColor],
                        }}
                        onClick={() => {
                          handleOpen(keyColor, _webTheme[keyColor]);
                        }}
                      >
                        choose the color {camelCase(keyColor)}
                      </Button>
                    </Box>
                  ))}
              </Box>
              {editColors()}
              {skin_web()}
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
