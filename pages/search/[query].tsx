import type { GetServerSideProps, NextPage } from 'next';
import { Box, Typography } from '@mui/material';

import { ShopLayout } from '../../components/layouts';

import { ProductList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={'Tesla Store - Search'}
      pageDescription={'Here you can find best Tesla products'}
    >
      <Typography variant='h1' component='h1'>
        Search Products
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
          Search Term: {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography variant='h2' sx={{ mb: 1 }}>
            No results for
          </Typography>
          <Typography
            variant='h2'
            sx={{ ml: 1 }}
            color='secondary'
            textTransform='capitalize'
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm('shirt');
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
