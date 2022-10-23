import { Typography } from '@mui/material';
import type { NextPage } from 'next';
import { ShopLayout } from '../components/layouts';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={'Tesla-Shop - Home'}
      pageDescription={'Here you can find best Tesla products'}
    >
      <Typography variant='h1' component='h1'>
        Store
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All products
      </Typography>
    </ShopLayout>
  );
};

export default Home;
