import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  AccountBalanceWallet as TransactionsIcon,
  PieChart as BudgetIcon,
  Assessment as ReportsIcon
} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240 }}>
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/transactions">
          <ListItemIcon><TransactionsIcon /></ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/budget">
          <ListItemIcon><BudgetIcon /></ListItemIcon>
          <ListItemText primary="Budget" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/reports">
          <ListItemIcon><ReportsIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;