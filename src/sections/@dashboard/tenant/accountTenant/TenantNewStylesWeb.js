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

  const { style} = useSelector((state) => state.style);

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
    // console.log(currenttenant, 'currenttenant');
    // console.log(style.theme_object?.web, 'theme_object?.web');
    // setwebTheme(webTheme);
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
      <Box sx={{ backgroundColor: '#04253f', padding: 2, borderRadius: 1 }}>
        <Box
          sx={{
            backgroundColor: _webTheme['lighter'],
            padding: 2,
            color: '#fff',
            borderRadius: 1,
            margin: 1,
            display: 'flex',
            justifyItems: 'self-end',
            flexDirection: 'row',
          }}
        >
          {style.logo.preview ? (
            <Image
              visibleByDefault
              disabledEffect
              sx={{
                width: 40,
              }}
              src={isString(style.logo) ? style.logo : style.logo.preview}
              alt="login"
            />
          ) : (
            ''
          )}
          <Box
            sx={{
              display: 'flex',
              justifyItems: 'self-start',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: _webTheme['text'], marginLeft: 2 }} noWrap>
              Users
            </Typography>
            <Typography variant="body2" sx={{ color: _webTheme['text'], marginLeft: 2 }} noWrap>
              Security
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: '#04253f',
            padding: 2,
            color: '#fff',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '70%',
          }}
        >
          <Box
            sx={{
              backgroundColor: _webTheme['dark'],
              padding: 2,
              color: '#fff',
              borderRadius: 1,
              width: '30%',
              marginRight: 2,
            }}
          >
            <Typography variant="body2" sx={{ color: _webTheme['text'] }} noWrap>
              Users
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: _webTheme['darker'],
              padding: 2,
              color: '#fff',
              borderRadius: 1,
              width: '70%',
              color: _webTheme['text'],
            }}
          >
            dashboard template
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: _webTheme['main'],
            padding: 2,
            color: '#fff',
            borderRadius: 1,
            width: '100%',
            margin: 1,
          }}
        >
          footer
        </Box>
      </Box>
    );
  };

  const handleTextChange = (e, key) => {
    const el = e.target;
    setwebTheme({ ..._webTheme, [key]: el.value });
    console.log(_webTheme, '_webTheme');
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
                columnGap: 2,
                rowGap: 2,
                gridTemplateColumns: 'auto auto',
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
                        sx={{ color: '#fff', backgroundColor: _webTheme[keyColor] }}
                        onClick={() => {
                          handleOpen(keyColor, _webTheme[keyColor]);
                        }}
                      >
                        choose the color {keyColor}
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
