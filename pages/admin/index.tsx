import React from 'react';
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';
import { Grid } from '@mui/material';
import { SummaryTile } from '../../components/admin';
import { CreditCardOffOutlined } from '@mui/icons-material';

const DashboardPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      subtitle='General stats'
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={1}
          subtitle='Total orders'
          icon={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={2}
          subtitle='Paid orders'
          icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={3}
          subtitle='Pending orders'
          icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={4}
          subtitle='Clients'
          icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={5}
          subtitle='Products'
          icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={6}
          subtitle='Out of stock'
          icon={
            <CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={7}
          subtitle='Low stock'
          icon={
            <ProductionQuantityLimitsOutlined
              color='warning'
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={8}
          subtitle='Updating in...'
          icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
