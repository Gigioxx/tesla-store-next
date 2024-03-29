import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Tesla Store - Men'}
      pageDescription={'Here you can find best Tesla products'}
    >
      <Typography variant='h1' component='h1'>
        Men
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for Men
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
