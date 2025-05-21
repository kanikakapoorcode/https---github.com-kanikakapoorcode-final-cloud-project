// src/components/Transactions/TransactionList.jsx
import { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Button,
  IconButton,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Search, Add, Edit, Delete, FilterList } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { enqueueSnackbar } = useSnackbar();

  // Categories for filter
  const categories = ['all', 'income', 'groceries', 'utilities', 'entertainment', 'transportation', 'healthcare', 'other'];

  useEffect(() => {
    // Mock data - replace with actual API call
    const fetchTransactions = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockTransactions = [
            { id: 1, date: '2025-05-15', description: 'Grocery Shopping', amount: -120.50, category: 'groceries' },
            { id: 2, date: '2025-05-14', description: 'Salary', amount: 3000.00, category: 'income' },
            { id: 3, date: '2025-05-12', description: 'Electric Bill', amount: -85.75, category: 'utilities' },
            { id: 4, date: '2025-05-10', description: 'Movie Tickets', amount: -24.99, category: 'entertainment' },
            { id: 5, date: '2025-05-08', description: 'Gas', amount: -45.00, category: 'transportation' },
            { id: 6, date: '2025-05-05', description: 'Doctor Visit', amount: -60.00, category: 'healthcare' },
            { id: 7, date: '2025-05-01', description: 'Internet Bill', amount: -79.99, category: 'utilities' },
          ];
          setTransactions(mockTransactions);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        enqueueSnackbar('Failed to load transactions', { variant: 'error' });
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [enqueueSnackbar]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteTransaction = (id) => {
    // Mock delete - replace with actual API call
    setTransactions(transactions.filter(transaction => transaction.id !== id));
    enqueueSnackbar('Transaction deleted successfully', { variant: 'success' });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Transactions
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          component={Link} 
          to="/dashboard/transactions/add"
        >
          Add Transaction
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Search transactions"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            size="small"
            sx={{ width: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              ),
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {loading ? (
          <Typography>Loading transactions...</Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>
                          <Box sx={{ 
                            textTransform: 'capitalize',
                            bgcolor: transaction.category === 'income' ? 'success.100' : 'grey.100',
                            color: transaction.category === 'income' ? 'success.800' : 'text.primary',
                            borderRadius: 1,
                            py: 0.5,
                            px: 1,
                            display: 'inline-block'
                          }}>
                            {transaction.category}
                          </Box>
                        </TableCell>
                        <TableCell align="right" sx={{ 
                          color: transaction.amount >= 0 ? 'success.main' : 'error.main',
                          fontWeight: 'medium'
                        }}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small" aria-label="edit">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            aria-label="delete"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredTransactions.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}