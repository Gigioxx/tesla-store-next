import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import useSWR from 'swr';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces/products';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Photo',
    renderCell: ({ row }) => {
      return (
        <a href={`/product/${row.slug}`} target='_blank' rel='noreferrer'>
          <CardMedia
            component='img'
            alt={row.title}
            className='fadeIn'
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline='always'>{row.title}</Link>
        </NextLink>
      );
    },
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'type', headerName: 'Type' },
  { field: 'inStock', headerName: 'Stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data) return;
  if (!data && !error) return <div>Loading...</div>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products (${data.length})`}
      subtitle='Manage products'
      icon={<CategoryOutlined />}
    >
      <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color='secondary'
          href='/admin/products/new'
        >
          Create product
        </Button>
      </Box>
      <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
