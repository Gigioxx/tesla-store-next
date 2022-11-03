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
import { AuthLayout } from '../../components/layouts';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { teslaApi } from '../../api';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await teslaApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Something went wrong');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }

    //Todo: navigate to login page
  };

  return (
    <AuthLayout title='Create Account'>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Create Account
              </Typography>
              <Chip
                label='User already registered'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Full Name'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                Create Account
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>I already have an account</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
