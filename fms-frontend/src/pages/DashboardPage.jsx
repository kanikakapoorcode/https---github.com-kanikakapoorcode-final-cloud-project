// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Paper, Grid } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import MainPanel from '../components/Dashboard/MainPanel';
import Sidebar from '../components/Dashboard/Sidebar';
import Alert from '../components/Dashboard/Alert';
import TransactionList from '../components/Transactions/TransactionList';
import AddTransaction from '../components/Transactions/AddTransaction';
import BudgetOverview from '../components/Budget/BudgetOverview';
import BudgetSetup from '../components/Budget/BudgetSetup';
import ReportGenerator from '../components/Reports/ReportGenerator';
import Layout from '../components/Layout';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  // Load alerts or notifications
  useEffect(() => {
    // Example alerts - replace with actual API calls
    setAlerts([
      { id: 1, type: 'warning', message: 'You are close to your monthly budget limit' },
      { id: 2, type: 'info', message: 'Remember to categorize your recent transactions' }
    ]);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography>Loading...</Typography>
    </Box>;
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="lg">
            {alerts.length > 0 && (
              <Box sx={{ mb: 3 }}>
                {alerts.map(alert => (
                  <Alert key={alert.id} type={alert.type} message={alert.message} />
                ))}
              </Box>
            )}
            
            <Routes>
              <Route path="/" element={<MainPanel />} />
              <Route path="transactions" element={<TransactionList />} />
              <Route path="transactions/add" element={<AddTransaction />} />
              <Route path="budget" element={<BudgetOverview />} />
              <Route path="budget/setup" element={<BudgetSetup />} />
              <Route path="reports" element={<ReportGenerator />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
}