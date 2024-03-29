import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import useSWR from 'swr';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser } from '../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order ID', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Full name', width: 250 },
  { field: 'total', headerName: 'Total amount', width: 150 },
  {
    field: 'isPaid',
    headerName: 'Paid',
    renderCell: ({ row }) => {
      return row.isPaid ? (
        <Chip variant='outlined' label='Paid' color='success' />
      ) : (
        <Chip variant='outlined' label='Pending' color='error' />
      );
    },
  },
  {
    field: 'productsQuantity',
    headerName: 'Number of products',
    align: 'center',
    width: 150,
  },
  {
    field: 'check',
    headerName: 'See order',
    renderCell: ({ row }) => {
      return (
        <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
          See order
        </a>
      );
    },
  },
  { field: 'createdAt', headerName: 'Created', width: 250 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if (!data) return;
  if (!data && !error) return <div>Loading...</div>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    productsQuantity: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title='Orders'
      subtitle='Manage orders'
      icon={<ConfirmationNumberOutlined />}
    >
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

export default OrdersPage;
