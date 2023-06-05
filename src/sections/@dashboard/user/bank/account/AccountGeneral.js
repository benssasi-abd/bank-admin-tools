import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
// form
import { capitalCase, snakeCase } from 'change-case';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../../../hooks/useAuth';
// utils
import { fData } from '../../../../../utils/formatNumber';
// _mock
import { countries } from '../../../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../../../components/hook-form';
import Label from '../../../../../components/Label';
// ----------------------------------------------------------------------
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { createFile } from '../../../../../redux/file';
import { listBanks, updatebankColumn } from './../../../../../redux/bank';
import { updateStyleColumn } from './../../../../../redux/style';


AccountGeneral.propTypes = {
  onPress: PropTypes.func,
};


export default function AccountGeneral({ onPress }) {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const dispatch = useDispatch();

  const { file, isLoading, error } = useSelector((state) => state.file);
  const { bankAccount } = useSelector((state) => state.bank);

  const defaultValues = {
    name: bankAccount?.name || '',
    namebank: bankAccount?.namebank || '',
    password: bankAccount?.password || '',
    email: bankAccount?.email || '',
    photoURL: bankAccount?.photoURL || '',
    url: bankAccount?.url || '',
    phone: bankAccount?.phoneNumber || '',
  };
  const [name, setName] = useState(defaultValues.name);
  const [url, setUrl] = useState(defaultValues.url);
  const [email, setEmail] = useState(defaultValues.email);
  const [phone, setPhone] = useState(defaultValues.phoneNumber);
  const [password, setPassword] = useState(defaultValues.password);
  const [namebank, setBankName] = useState(defaultValues.namebank);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    url: Yup.string().required('Url is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    namebank: Yup.string().required('Name of bank is required'),
    phone: Yup.string().required('Phone is required'),
  });

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log('onSubmit', data);
    const { email, name, namebank, url, password, phone } = data;
    try {
      dispatch(updateStyleColumn('styles', 'currentTabU'));

      onPress();
      dispatch(updatebankColumn(email, 'email'));
      dispatch(updatebankColumn(name, 'name'));
      dispatch(updatebankColumn(namebank, 'namebank'));
      dispatch(updatebankColumn(snakeCase(namebank), 'key'));
      dispatch(updatebankColumn(url, 'url'));
      dispatch(updatebankColumn(password, 'password'));
      dispatch(updatebankColumn(phone, 'phoneNumber'));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField
                name="email"
                label="Email Address"
              />
              <RHFTextField
                name="password"
                type="password"
                label="Password"
              />
              <RHFTextField
                name="name"
                label="Full Name"
              />
              <RHFTextField
                name="phone"
                label="Phone Number"
              />
              <RHFTextField
                name="namebank"
                label="Name Bank"
              />
              <RHFTextField name="url" label="URL"
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" onClick={onsubmit} variant="contained" loading={isSubmitting}>
                Save and Next
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
