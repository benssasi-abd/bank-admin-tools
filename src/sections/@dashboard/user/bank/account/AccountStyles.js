import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { paramCase } from 'change-case';
// @mui
import { Stack, Card, InputAdornment, Grid, Typography, Box, CardHeader } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import { fData } from '../../../../../utils/formatNumber';
import uuidv4 from '../../../../../utils/uuidv4';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// components
import Iconify from '../../../../../components/Iconify';
import { FormProvider, RHFTextField, RHFUploadAvatar, RHFUploadSingleFile } from '../../../../../components/hook-form';
import ComponentCardStyle from '../../../../../sections/overview/ComponentCardStyle';

import Label from '../../../../../components/Label';
import { useDispatch, useSelector } from '../../../../../redux/store';
import { updateStyleColumn } from './../../../../../redux/style';
import { useRouter } from 'next/router';

import { createFile } from '../../../../../redux/file';
import { createAccountBank } from '../../../../../redux/bank';
import { createAccount } from '../../../../../redux/user';
import CONFIG from './../../../../../app/apiConfig';

// ----------------------------------------------------------------------
const { PUBLIC_CLIENT_ID, PUBLIC_CLIENT_SECRET, PUBLIC_GRANT_TYPE } = CONFIG;
const client_id = `${PUBLIC_CLIENT_ID}`;
const client_secret = `${PUBLIC_CLIENT_SECRET}`;
// ----------------------------------------------------------------------


AccountStyles.propTypes = {
  onPress: PropTypes.func,
};

export default function AccountStyles({ onPress }) {

  const { push } = useRouter();

  
  const { bankAccount, bank, error, isLoading } = useSelector((state) => state.bank);
  const { file } = useSelector((state) => state.file);
  const { style } = useSelector((state) => state.style);


  const dispatch = useDispatch();
  const defaultValues = {};

  const methods = useForm({
    defaultValues,
  });

  const FOUNDATION_LIST = ['page_login'].map((item) => ({
    name: item,
    href: `/customPage/${item}`,
    icon: `/logo/${item}.png`,
  }));
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    try {
      const { key, namebank, url } = bankAccount;
      const { avatar, login_page, colorText, themecolorpresets } = style;
      console.log(style, 'style');
      let colors = {
        primary: colorText,
        info: '',
        success: '',
        warning: '',
        error: '',
      };
      let payload = {
        key,
        name: namebank,
        avatar: avatar,
        login_page: login_page,
        white_logo: avatar,
        black_logo: avatar,
        style_file: avatar,
        url,
        theme_colors: themecolorpresets,
      };
      dispatch(createAccountBank(payload)).then((data) => onCreateAccount(data));
    } catch (error) {
      console.error(error);
    }
  };

    const handlePrevious = async () => {
      try {
        dispatch(updateStyleColumn('general', 'currentTabU'));
        onPress();
      } catch (error) {
        console.error(error);
      }
    };
  

  const onCreateAccount =  (data) => {
    try {

      console.log(data, 'data');
      const { email, phoneNumber, name, password } = bankAccount;
      let payload_user = {
        client_id: client_id,
        client_secret: client_secret,
        name: name,
        nif_number: '683135030' + data?.id,
        cell_phone: phoneNumber,
        email: email,
        user_identifier: uuidv4(),
        is_admin: true,
        password: password,
        password_confirmation: password,
        wtl_id: data?.id,
        role: 0,
      };
      dispatch(createAccount(payload_user));
      push(PATH_DASHBOARD.user.bank);
    } catch (error) {
      console.error(error);
    }
  };

    const handleDrop = useCallback(
      () => {
        const file = acceptedFiles[0];

        if (file) {
          setValue(
            'photoLoginPage',
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        }
      },
      [setValue]
    );

  useEffect(() => {
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {FOUNDATION_LIST.map((item, index) => (
          <Grid key={index} item xs={12} md={6}>
            <Card sx={{ py: 3, px: 3, textAlign: 'center' }}>
              <CardHeader
                title=""
                action={
                  <Label
                    color={'success'}
                    sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                  >
                    {paramCase(item.name)}
                  </Label>
                }
              />

              <Box
                sx={{
                  mt: 2.2,
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                }}
              >
                <ComponentCardStyle key={item.name} item={item} />
              </Box>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={12}>
          <Card sx={{ py: 3, px: 3, textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
            <LoadingButton type="button" onClick={handlePrevious} variant="contained" loading={isSubmitting}>
              previous
            </LoadingButton>
            <LoadingButton type="button" onClick={onSubmit} variant="contained" loading={isSubmitting}>
              Save and Submit
            </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
