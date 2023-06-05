import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';


import CONFIG from './../../../app/apiConfig';

const { API_BASE_URL, PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const baseURL = `${API_BASE_URL}`;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;
const grant_type = `${PUBLIC_GRANT_TYPE}`;

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  


  
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

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

  const onSubmit = async (data) => {

    console.log('onSubmit', data);
    try {
      await login(data);
    } catch (error) {
      console.error(error);
      // reset();
        console.log(error, 'error');

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!errors.afterSubmit && console.log(errors.afterSubmit.message, 'errors.afterSubmit')}
        <RHFTextField
          name="username"
          label="Email address"
          // onChange={(e) => setUsername(e.target.value)}
          // value={username}
        />

        <RHFTextField
          name="password"
          label="Password"
          // onChange={(e) => setPassword(e.target.value)}
          // value={password}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <NextLink href={PATH_AUTH.resetPassword} passHref>
          <Link variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        sx={{
          backgroundColor: 'custom_primary.main',
          '&:hover': { backgroundColor: 'custom_primary.dark' },
        }}
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
}
