import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const AddressPage = () => {
  return (
    <ShopLayout
      title='Address'
      pageDescription='Confirm shipping and billing address'
    >
      <Typography variant='h1' component='h1'>
        Address
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='First name' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Last name' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Address' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address 2 (Optional)' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Postal code' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='City' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant='filled' label='Country' value={1}>
              <MenuItem value={1}>Chile</MenuItem>
              <MenuItem value={2}>Argentina</MenuItem>
              <MenuItem value={3}>United States</MenuItem>
              <MenuItem value={4}>Canada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Phone number' variant='filled' fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
        <Button color='secondary' className='circular-btn' size='large'>
          Check order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
