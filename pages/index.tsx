import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../components/layouts';

import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts('/products');

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
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
