import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Switch, Box } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';


const Sidebar = ({ toggleDarkMode, setFilter, filter }) => (
  <Drawer variant="permanent" anchor="left" sx={{ width: 220, flexShrink: 0, '& .MuiDrawer-paper': { width: 220, boxSizing: 'border-box' } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List>
        <ListItem button selected={filter === 'all'} onClick={() => setFilter('all')}>
          <ListItemIcon><ListAltIcon /></ListItemIcon>
          <ListItemText primary="All Tasks" />
        </ListItem>
        <ListItem button selected={filter === 'pending'} onClick={() => setFilter('pending')}>
          <ListItemIcon><PendingActionsIcon /></ListItemIcon>
          <ListItemText primary="Pending" />
        </ListItem>
        <ListItem button selected={filter === 'completed'} onClick={() => setFilter('completed')}>
          <ListItemIcon><CheckCircleIcon /></ListItemIcon>
          <ListItemText primary="Completed" />
        </ListItem>
        <ListItem button selected={filter === 'profile'} onClick={() => setFilter('profile')}>
          <ListItemIcon><AccountCircleIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Brightness4Icon />
        <Switch checked={localStorage.getItem('darkMode') === 'true'} onChange={toggleDarkMode} />
      </Box>
    </Box>
  </Drawer>
);

export default Sidebar;
