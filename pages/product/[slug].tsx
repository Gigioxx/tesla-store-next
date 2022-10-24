import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';

import { dbProducts } from '../../database';
import { IProduct } from '../../components/products/interfaces';

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            {/* titles */}
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              {`$${product.price}`}
            </Typography>

            {/* quantity */}
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {/* Add to cart */}
            <Button color='secondary' className='circular-btn'>
              Add to cart
            </Button>

            {/* <Chip label='Out of stock' color='error' variant='outlined' /> */}

            {/* description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    // 1 Day in seconds
    revalidate: 86400,
  };
};

export default ProductPage;
