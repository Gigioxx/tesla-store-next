import { useState } from 'react';
import NextLink from 'next/link';

import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { teslaApi } from '../../api';

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await teslaApi.post('/user/login', { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Credentials are not valid');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }

    //Todo: navigate to route where the user was before login
  };

  return (
    <AuthLayout title='Log In'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Log In
              </Typography>
              <Chip
                label='The user / password are incorrect'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Email'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Log In
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/register' passHref>
                <Link underline='always'>Create Account</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
