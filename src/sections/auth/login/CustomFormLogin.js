import * as Yup from 'yup';
import { useState } from 'react';
// next
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {  Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
// hooks
import useAuth from '../../../hooks/useAuth';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

import CONFIG from './../../../app/apiConfig';

const { API_BASE_URL, PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const baseURL = `${API_BASE_URL}`;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;
const grant_type = `${PUBLIC_GRANT_TYPE}`;

// ----------------------------------------------------------------------

export default function CustomFormLogin({ colortext }) {
  const { login } = useAuth();


  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password'),
  });

  const defaultValues = {
    username: '',
    password: '',
    remember: false,
    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,
    admin: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;


  return (
    <FormProvider methods={methods} onSubmit={() => {}}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="username"
          label="Email address"
          onChange={(e) => setUsername(e.target.value)}
          disabled
        />

        <RHFTextField
          name="password"
          label="Password"
          disabled
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2, mt: 2 }}>

      </Stack>

      <LoadingButton
        sx={{ background: colortext }}
        fullWidth
        size="large"
        type="button"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
