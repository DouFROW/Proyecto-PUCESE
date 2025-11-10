import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Navbar = ({ currentView, onSwitchView }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userType = currentView === 'admin' ? 'Admin' : 'User';
  const switchText = currentView === 'admin' ? 'Cambiar a Vista de Socio' : 'Cambiar a Vista de Administrador';

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: 'black', zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Sistema AETPUCE
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              size="small" 
              onClick={onSwitchView}
              sx={{ 
                backgroundColor: '#17a2b8', 
                '&:hover': { backgroundColor: '#138496' },
                mr: 1,
                textTransform: 'none',
                borderRadius: '4px',
                fontSize: '0.75rem',
                padding: '2px 8px'
              }}
            >
              {userType}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
        <MenuItem onClick={handleClose}>Configuración</MenuItem>
        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
        <MenuItem onClick={() => { onSwitchView(); handleClose(); }}>{switchText}</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
