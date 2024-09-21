import { Box, Drawer, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar - Drawer Component from MUI */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240, // Fixed width for sidebar
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' }, // Sidebar fixed
        }}
      >
        <Sidebar />
      </Drawer>

      {/* Main content area */}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <CssBaseline />
        {/* Navbar */}
        <Toolbar>
          <Navbar/>
        </Toolbar>

        {/* Content */}
        <Box sx={{ m: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
