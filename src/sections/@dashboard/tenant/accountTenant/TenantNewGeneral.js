import PropTypes from 'prop-types';
import * as Yup from 'yup';
import isString from 'lodash/isString';
import { capitalCase } from 'change-case';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, CardHeader, Container, Button } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// redux
import { updateStyleColumn, handleCreateFile, handleCreateFiles, removeKey } from './../../../../redux/style';
import { useDispatch, useSelector } from '../../../../redux/store';
import { setCurrentTenant } from '../../../../redux/tenant';

// components
import Label from '../../../../components/Label';
import Loading from '../../../../components/Loading';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';

import { FormProvider, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// config

import imgTheme from './../../../../theme/img/index.json';

import { env } from './../../../../utils/env';

// ----------------------------------------------------------------------

TenantNewGeneral.propTypes = {
  isEdit: PropTypes.bool,
};

export default function TenantNewGeneral({ isEdit = false, onPress }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { style, isLoading } = useSelector((state) => state.style);

  const { currenttenant } = useSelector((state) => state.tenant);

  const [_theme_imgs, setImgTheme] = useState(style.theme_object?.imgPreview || imgTheme || []);

  const [_img_upload, setImgObj] = useState(style.img_upload || []);

  const NewTenantSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    domain: Yup.string().required('domain is required'),
    domain_api: Yup.string().required('Domain Banking System is required'),
    environment: Yup.string().min(1000).required('environment is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currenttenant?.name || '',
      domain: currenttenant?.domain || '',
      domain_api: currenttenant?.domain_api || '',
      environment:
        currenttenant?.environment ||
        `<pre class="ql-syntax" spellcheck="false"><span class="hljs-comment">${env}</pre>`,
      _theme_imgs,
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

  useEffect(() => {}, [currenttenant]);

  const uploadFile = (data, field, bl = true, json = true, type) => {
    dispatch(handleCreateFile(data, field, true, json, type));
  };

  const onSubmit = async (data) => {
    try {
      let payload = {
        domain: data?.domain,
        name: data?.name,
        environment: data?.environment,
        domain_api: data?.domain_api,
      };

      dispatch(setCurrentTenant(payload));

      dispatch(updateStyleColumn('stylesTenantWeb', 'currentTabTenant'));

      dispatch(updateStyleColumn({ ...style.theme_object, imgPreview: _theme_imgs }, 'theme_object'));

      let cleanText = data.environment.replace(/<\/?[^>]+(>|$)/g, '');

      console.log(cleanText, 'cleanText');

      uploadFile(cleanText, 'environment', true, false, 'text/plain');

      uploadFile(style.img_upload, 'login_page');

      onPress();
    } catch (error) {
      console.error(error);
    }
  };

  const removeImg = (el) => {
    setImgTheme({
      ..._theme_imgs,
      [el]: null,
    });

    dispatch(updateStyleColumn({ ...style.theme_object, imgPreview: _theme_imgs }, 'theme_object'));

    dispatch(removeKey(el, 'img_upload'));

    setValue(el, null);

    // reset(defaultValues.el);
  };

  function HandleDropFile({ el }) {
    const handleDrop_img = useCallback(
      (acceptedFiles) => {
        const _file = acceptedFiles[0];
        setValue(
          el,
          Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          })
        );
        setImgTheme({
          ..._theme_imgs,
          [el]: Object.assign(_file, {
            preview: URL.createObjectURL(_file),
          }),
        });

        dispatch(handleCreateFiles(_file, el, 'img_upload'));
      },
      [el]
    );

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {_theme_imgs[el] ? (
          <>
            <Box
              sx={{
                zIndex: 20,
                top: '15%',
                right: '26%',
                backgroundColor: '#de033838',
                borderRadius: '50%',
                position: 'absolute',
              }}
            >
              <Button
                onClick={() => {
                  removeImg(el);
                }}
                variant="text"
                sx={{ color: '#de0338', padding: 0, borderRadius: '50%', width: 30, minWidth: 30, height: 30 }}
              >
                <Iconify icon={'material-symbols:cancel'} width={50} height={20} />
              </Button>
            </Box>
            <Image
              alt={_theme_imgs[el]}
              src={isString(_theme_imgs[el]) ? _theme_imgs[el] : _theme_imgs[el].preview}
              sx={{
                opacity: 1,
                transition: 'none',
                zIndex: 8,
                objectFit: 'fill',
                width: 150,
                height: 150,
              }}
            />
          </>
        ) : (
          <RHFUploadAvatar
            name={el}
            accept="image/*"
            maxSize={10145728}
            onDrop={handleDrop_img}
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
        )}
      </Box>
    );
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ backgroundColor: '#fff', boxShadow: 'none', padding: 3 }}>
              <CardHeader title="Logo" sx={{ padding: 2 }} />
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                {imgTheme &&
                  Object.keys(imgTheme).map((keyimg, i) => (
                    <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
                      <Box>
                        <Label
                          color={'secondary'}
                          sx={{ textTransform: 'capitalize', position: 'absolute', top: 24, right: 24 }}
                        >
                          {capitalCase(keyimg)}
                        </Label>
                        <Box sx={{ marginTop: 5 }}>
                          <HandleDropFile key={i} el={keyimg} />
                        </Box>
                      </Box>
                    </Card>
                  ))}
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  marginBottom: 2,
                }}
              >
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="domain" label="Domain" />
                <RHFTextField name="domain_api" label="Domain Banking System" />
              </Box>
              <Typography id="" variant="h5" component="h1">
                Environment
              </Typography>
              <Box
                sx={{
                  marginTop: 2,
                }}
              >
                <RHFEditor simple name="environment" />
              </Box>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  onClick={onsubmit}
                  // disabled={style.logo_white ? false : true}
                  type="submit"
                  variant="contained"
                  loading={isLoading}
                >
                  {!isEdit ? 'Next Step' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}
