import React, { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Home,
  Description,
  AccountBalance,
  BarChart,
  Groups,
  AdminPanelSettings,
  PersonAdd,
  Assessment,
  Person,
  Settings,
  ExitToApp,
  AccountCircle,
} from "@mui/icons-material";

const MobileNavbar = ({ activeNav, onNavClick, isAdmin, user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);

  // Items según tipo de usuario
  const navItems = isAdmin
    ? [
        { label: "Inicio", icon: Home, view: "dashboard" },
        { label: "Socios", icon: Groups, view: "view-active-members" },
        { label: "Préstamos", icon: AccountBalance, view: "view-active-loans" },
        {
          label: "Descuentos",
          icon: Assessment,
          view: "monthly-discount-report",
        },
        { label: "Usuario", icon: AccountCircle, view: "user-menu" },
      ]
    : [
        { label: "Inicio", icon: Home, view: "dashboard" },
        { label: "Documentos", icon: Description, view: "documentos" },
        { label: "Préstamos", icon: AccountBalance, view: "prestamos" },
        { label: "Reportes", icon: BarChart, view: "reportes" },
        { label: "Usuario", icon: AccountCircle, view: "user-menu" },
      ];

  const handleUserMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (newValue) => {
    if (newValue === "user-menu") {
      // El menú de usuario se maneja diferente
      return;
    }
    onNavClick(newValue);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    onLogout();
  };

  const handleProfile = () => {
    handleUserMenuClose();
    onNavClick("perfil");
  };

  const handleSettings = () => {
    handleUserMenuClose();
    onNavClick("configuracion");
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: "white",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <BottomNavigation
          value={activeNav}
          onChange={(event, newValue) => handleNavClick(newValue)}
          showLabels
          sx={{
            p: 1,
            justifyContent: "space-around",
            height: "70px",
          }}
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.view}
              label={item.label}
              value={item.view}
              icon={<item.icon />}
              onClick={
                item.view === "user-menu" ? handleUserMenuClick : undefined
              }
              sx={{
                color:
                  activeNav === item.view ? "primary.main" : "text.secondary",
                minWidth: "auto",
                padding: "6px 0",
                "& .MuiBottomNavigationAction-label": {
                  fontSize: "0.7rem",
                  mt: 0.5,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "1.4rem",
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>

      {/* Menú de Usuario */}
      <Menu
        anchorEl={anchorEl}
        open={userMenuOpen}
        onClose={handleUserMenuClose}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        sx={{
          "& .MuiPaper-root": {
            width: 280,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            marginBottom: 2,
          },
        }}
      >
        {/* Header del usuario */}
        <MenuItem sx={{ py: 2, cursor: "default" }}>
          <ListItemIcon>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
              }}
            >
              {user?.nombre?.charAt(0) || "U"}
            </Avatar>
          </ListItemIcon>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {user?.nombre || "Usuario"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email || "usuario@ejemplo.com"}
            </Typography>
            <Typography variant="caption" color="primary">
              {isAdmin ? "Administrador" : "Socio"}
            </Typography>
          </Box>
        </MenuItem>

        <Divider />

        {/* Opciones del menú */}
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuración</ListItemText>
        </MenuItem>

        {isAdmin && (
          <MenuItem
            onClick={() => {
              handleUserMenuClose();
              onNavClick("administracion");
            }}
          >
            <ListItemIcon>
              <AdminPanelSettings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Panel Admin</ListItemText>
          </MenuItem>
        )}

        <Divider />

        {/* Cerrar sesión */}
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          <ListItemIcon>
            <ExitToApp fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MobileNavbar;
