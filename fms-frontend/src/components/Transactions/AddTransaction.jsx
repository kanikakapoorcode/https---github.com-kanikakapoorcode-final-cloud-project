import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  MenuItem,
  InputAdornment,
  FormControlLabel,
  Switch,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSnackbar } from 'notistack';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [isIncome, setIsIncome] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    notes: ''
  });

  // Categories based on transaction type
  const categories = isIncome
    ? ['salary', 'investment', 'gift', 'refund', 'other']
    : ['groceries', 'utilities', 'rent', 'transportation', 'healthcare', 'entertainment', 'dining', 'shopping', 'education', 'other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.description || !formData.amount || !formData.category) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'warning' });
      return;
    }

    // Format amount based on transaction type
    const amount = isIncome ? Math.abs(parseFloat(formData.amount)) : -Math.abs(parseFloat(formData.amount));

    // Prepare transaction object
    const transaction = {
      description: formData.description,
      amount,
      category: formData.category,
      date: transactionDate.toISOString().split('T')[0],
      notes: formData.notes || ''
    };

    // Mock API call - replace with actual submission
    console.log('Submitting transaction:', transaction);
    
    // Show success message and navigate back
    enqueueSnackbar('Transaction added successfully', { variant: 'success' });
    navigate('/dashboard/transactions');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Add Transaction
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={isIncome} 
                    onChange={() => setIsIncome(!isIncome)}
                    color="success"
                  />
                }
                label={isIncome ? "Income" : "Expense"}
              />
              <Divider sx={{ my: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Transaction Date"
                  value={transactionDate}
                  onChange={(newDate) => setTransactionDate(newDate)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  maxDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes (Optional)"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/dashboard/transactions')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color={isIncome ? "success" : "primary"}
                >
                  Add {isIncome ? "Income" : "Expense"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}