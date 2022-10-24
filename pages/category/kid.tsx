import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout
      title={'Tesla Store - Kids'}
      pageDescription={'Here you can find best Tesla products'}
    >
      <Typography variant='h1' component='h1'>
        Kids
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for Kids
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
