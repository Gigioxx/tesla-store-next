import NextLink from 'next/link';

import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows if the order is already paid',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color='success' label='Paid' variant='outlined' />
      ) : (
        <Chip color='error' label='Pending Payment' variant='outlined' />
      );
    },
  },
  {
    field: 'orderDetails',
    headerName: 'Order Details',
    width: 200,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline='always'>See order details</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    paid: true,
    fullName: 'Guillermo Casanova',
  },
  {
    id: 2,
    paid: false,
    fullName: 'John Doe',
  },
  {
    id: 3,
    paid: true,
    fullName: 'Cristiano Ronaldo',
  },
  {
    id: 4,
    paid: false,
    fullName: 'Elon Musk',
  },
];

const HistoryPage = () => {
  return (
    <ShopLayout title='Orders history' pageDescription='Client orders history'>
      <Typography variant='h1' component='h1'>
        Orders history
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;
