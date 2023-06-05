import PropTypes from 'prop-types';
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
  CardHeader,
  Container,
} from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// redux
import { updateStyleColumn, handleCreateFile } from './../../../../redux/style';
import { useDispatch, useSelector } from '../../../../redux/store';
import { setCurrentTenant } from '../../../../redux/tenant';

// components
import Label from '../../../../components/Label';
import Loading from '../../../../components/Loading';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

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

  const NewTenantSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    domain: Yup.string().required('domain is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currenttenant?.name || '',
      domain: currenttenant?.domain || '',
      logo: style?.logo || [],
      logo_white: style?.logo_white || [],
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
    if (isEdit && currenttenant) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currenttenant]);

  const onSubmit = async (data) => {
    try {
      let payload = {
        white_logo: style?.white_logo,
        black_logo: style?.black_logo,
        domain: data?.domain,
        name: data?.name,
      };

      dispatch(setCurrentTenant(payload));
      dispatch(updateStyleColumn('stylesTenantWeb', 'currentTabTenant'));
      onPress();
      //reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop_black = useCallback((acceptedFiles) => {
    const _file = acceptedFiles[0];
    if (_file) {
      setValue(
        'logo',
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
        'logo'
      )
    );
    dispatch(handleCreateFile(_file, 'black_logo'));
  }, []);
  const handleDrop_White = useCallback(
    (acceptedFiles) => {
      const _file = acceptedFiles[0];
      if (_file) {
        setValue(
          'logo_white',
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
          'logo_white'
        )
      );
      dispatch(handleCreateFile(_file, 'white_logo'));
    },

    []
  );

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
                <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
                  <Box>
                    <Label
                      color={'success'}
                      sx={{ textTransform: 'capitalize', position: 'absolute', top: 24, right: 24 }}
                    >
                      Black
                    </Label>

                    <RHFUploadAvatar
                      name="logo"
                      accept="image/*"
                      maxSize={10145728}
                      onDrop={handleDrop_black}
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
                </Card>
                <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
                  <Box>
                    <Label
                      color={'success'}
                      sx={{ textTransform: 'capitalize', position: 'absolute', top: 24, right: 24 }}
                    >
                      White
                    </Label>
                    <RHFUploadAvatar
                      name="logo_white"
                      accept="image/*"
                      maxSize={10145728}
                      onDrop={handleDrop_White}
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
                </Card>
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
                }}
              >
                <RHFTextField name="name" label="Name" />
                <RHFTextField name="domain" label="Domain" />
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
