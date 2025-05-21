import { useState, useEffect } from 'react'; // Add this import
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Alert from '../components/Dashboard/Alert';
import { useAuth } from '../hooks/useAuth'; // Updated import path

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [spendAlert, setSpendAlert] = useState(null); // Now properly imported

  useEffect(() => { // Now properly imported
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {spendAlert && (
          <Alert
            message={spendAlert.message}
            onClose={() => setSpendAlert(null)}
          />
        )}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardPage;