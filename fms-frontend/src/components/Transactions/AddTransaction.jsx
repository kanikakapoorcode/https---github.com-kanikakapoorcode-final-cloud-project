// src/components/Transactions/AddTransaction.jsx
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { transactionAPI } from '../../services/api';

const categories = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Healthcare',
  'Education',
  'Shopping',
  'Other'
];

const AddTransaction = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      amount: '',
      category: '',
      description: '',
      receipt: null
    },
    validationSchema: Yup.object({
      amount: Yup.number().positive('Must be positive').required('Required'),
      category: Yup.string().required('Required'),
      description: Yup.string()
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // In a real app, you would upload the receipt and process it
        await transactionAPI.add({
          ...values,
          amount: parseFloat(values.amount)
        });
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error adding transaction:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Transaction</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            margin="normal"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <TextField
            select
            fullWidth
            id="category"
            name="category"
            label="Category"
            margin="normal"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            margin="normal"
            multiline
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <input
            accept="image/*"
            id="receipt-upload"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => formik.setFieldValue('receipt', e.target.files[0])}
          />
          <label htmlFor="receipt-upload">
            <Button variant="outlined" component="span" fullWidth sx={{ mt: 2 }}>
              Upload Receipt
            </Button>
          </label>
          {formik.values.receipt && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              {formik.values.receipt.name}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          type="submit" 
          variant="contained" 
          disabled={loading}
          onClick={formik.handleSubmit}
        >
          {loading ? 'Adding...' : 'Add Transaction'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransaction;