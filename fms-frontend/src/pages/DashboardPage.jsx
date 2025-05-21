import { useState, useEffect } from 'react';
import { Box, CssBaseline, Toolbar, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar';
import Alert from '../components/Dashboard/Alert';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [spendAlert, setSpendAlert] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      
      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        
        {/* Alert Notification */}
        {spendAlert && (
          <Alert
            message={spendAlert.message}
            onClose={() => setSpendAlert(null)}
          />
        )}
        
        {/* Centered Content Container */}
        <Container 
          maxWidth="lg" 
          sx={{
            flexGrow: 1,
            py: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Outlet /> {/* This will render nested routes */}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;