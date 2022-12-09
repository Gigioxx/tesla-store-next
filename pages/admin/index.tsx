import React from 'react';
import { DashboardOutlined } from '@mui/icons-material';
import { AdminLayout } from '../../components/layouts';

const DashboardPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      subtitle='General stats'
      icon={<DashboardOutlined />}
    >
      <h3>Hello world!</h3>
    </AdminLayout>
  );
};

export default DashboardPage;
