import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BarChartIcon from "@mui/icons-material/BarChart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CancelIcon from "@mui/icons-material/Cancel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaymentIcon from "@mui/icons-material/Payment";
import SummarizeIcon from "@mui/icons-material/Summarize";

const drawerWidth = 260;

function Sidebar({ activeNav, onNavClick, isAdmin }) {
  const [expandedSections, setExpandedSections] = useState({
    memberManagement: false,
    loanManagement: false,
    discountManagement: false,
    myLoans: false,
    myReports: false,
  });

  const handleSectionToggle = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Vistas principales (comunes para admin y usuario)
  const navItems = [
    { icon: HomeIcon, label: "Inicio", view: "dashboard" },
    { icon: DescriptionIcon, label: "Documentos", view: "documentos" },
  ];

  // Sección de préstamos para usuarios
  const userLoanItems = [
    {
      icon: AssignmentIcon,
      label: "Mis Préstamos Activos",
      view: "my-active-loans",
    },
    {
      icon: PaymentIcon,
      label: "Historial de Pagos",
      view: "my-payment-history",
    },
    {
      icon: CancelIcon,
      label: "Préstamos Finalizados",
      view: "my-finished-loans",
    },
  ];
  // Sección de reportes para usuarios
  const userReportItems = [
    {
      icon: ReceiptIcon,
      label: "Reporte Anual",
      view: "user-annual-discount-report",
    },
    {
      icon: ReceiptIcon,
      label: "Reporte Mensual",
      view: "user-monthly-discount-report",
    },
  ];
  // Gestión de Socios (solo admin)
  const memberManagementItems = [
    { icon: PersonAddIcon, label: "Agregar Nuevo Socio", view: "add-member" },
    {
      icon: PersonRemoveIcon,
      label: "Des/Activar Socio",
      view: "deactivate-member",
    },
    {
      icon: VisibilityIcon,
      label: "Ver Socios Activos",
      view: "view-active-members",
    },
  ];

  // Gestión de Préstamos (solo admin)
  const loanManagementItems = [
    {
      icon: AssignmentIcon,
      label: "Ver Préstamos Activos",
      view: "view-active-loans",
    },
    {
      icon: AssignmentIcon,
      label: "Ver Solicitudes",
      view: "view-loan-applications",
    },
    {
      icon: CancelIcon,
      label: "Ver Préstamos Cancelados",
      view: "view-canceled-loans",
    },
    {
      icon: VisibilityIcon,
      label: "Préstamos por Socio",
      view: "loans-by-member",
    },
  ];

  // Gestión de Descuentos (solo admin)
  const discountManagementItems = [
    {
      icon: AssessmentIcon,
      label: "Reporte Anual",
      view: "annual-discount-report",
    },
    {
      icon: ReceiptIcon,
      label: "Reporte Mensual",
      view: "monthly-discount-report",
    },
  ];

  // Vistas extra para admin
  const adminItems = [
    { icon: MonetizationOnIcon, label: "Contabilidad", view: "contabilidad" },
    { icon: SettingsIcon, label: "Administración", view: "administracion" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0056b3",
          color: "white",
          pt: 8,
        },
      }}
    >
      <List>
        {/* Navegación principal - Común para todos */}
        {navItems.map((item) => (
          <ListItem
            key={item.view}
            selected={activeNav === item.view}
            onClick={() => onNavClick(item.view)}
            sx={{
              color: "rgba(255,255,255,0.8)",
              mx: 1,
              my: 0.5,
              borderRadius: 1,
              transition: "all 0.2s",
              cursor: "pointer",
              "&:hover, &.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {/* Opciones para usuarios normales */}
        {!isAdmin && (
          <>
            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

            {/* Mis Préstamos - Sección expandible */}
            <ListItem
              onClick={() => handleSectionToggle("myLoans")}
              sx={{
                color: "rgba(255,255,255,0.8)",
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Préstamos" />
              {expandedSections.myLoans ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>

            <Collapse
              in={expandedSections.myLoans}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {userLoanItems.map((item) => (
                  <ListItem
                    key={item.view}
                    selected={activeNav === item.view}
                    onClick={() => onNavClick(item.view)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      pl: 4,
                      transition: "all 0.2s",
                      cursor: "pointer",
                      "&:hover, &.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            {/* Mis Reportes - Sección expandible */}
            <ListItem
              onClick={() => handleSectionToggle("myReports")}
              sx={{
                color: "rgba(255,255,255,0.8)",
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Reportes" />
              {expandedSections.myReports ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>

            <Collapse
              in={expandedSections.myReports}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {userReportItems.map((item) => (
                  <ListItem
                    key={item.view}
                    selected={activeNav === item.view}
                    onClick={() => onNavClick(item.view)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      pl: 4,
                      transition: "all 0.2s",
                      cursor: "pointer",
                      "&:hover, &.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </>
        )}

        {/* Opciones de administrador */}
        {isAdmin && (
          <>
            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

            {/* Gestión de Socios */}
            <ListItem
              onClick={() => handleSectionToggle("memberManagement")}
              sx={{
                color: "rgba(255,255,255,0.8)",
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión de Socios" />
              {expandedSections.memberManagement ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse
              in={expandedSections.memberManagement}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {memberManagementItems.map((item) => (
                  <ListItem
                    key={item.view}
                    selected={activeNav === item.view}
                    onClick={() => onNavClick(item.view)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      pl: 4,
                      transition: "all 0.2s",
                      cursor: "pointer",
                      "&:hover, &.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Gestión de Préstamos */}
            <ListItem
              onClick={() => handleSectionToggle("loanManagement")}
              sx={{
                color: "rgba(255,255,255,0.8)",
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión de Préstamos" />
              {expandedSections.loanManagement ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse
              in={expandedSections.loanManagement}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {loanManagementItems.map((item) => (
                  <ListItem
                    key={item.view}
                    selected={activeNav === item.view}
                    onClick={() => onNavClick(item.view)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      pl: 4,
                      transition: "all 0.2s",
                      cursor: "pointer",
                      "&:hover, &.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Gestión de Descuentos */}
            <ListItem
              onClick={() => handleSectionToggle("discountManagement")}
              sx={{
                color: "rgba(255,255,255,0.8)",
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                transition: "all 0.2s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión de Descuentos" />
              {expandedSections.discountManagement ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItem>
            <Collapse
              in={expandedSections.discountManagement}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {discountManagementItems.map((item) => (
                  <ListItem
                    key={item.view}
                    selected={activeNav === item.view}
                    onClick={() => onNavClick(item.view)}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      mx: 1,
                      my: 0.5,
                      borderRadius: 1,
                      pl: 4,
                      transition: "all 0.2s",
                      cursor: "pointer",
                      "&:hover, &.Mui-selected": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        color: "white",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

            {/* Vistas administrativas */}
            {adminItems.map((item) => (
              <ListItem
                key={item.view}
                selected={activeNav === item.view}
                onClick={() => onNavClick(item.view)}
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  mx: 1,
                  my: 0.5,
                  borderRadius: 1,
                  transition: "all 0.2s",
                  cursor: "pointer",
                  "&:hover, &.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "white",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </>
        )}
      </List>
    </Drawer>
  );
}

export { Sidebar };
export default Sidebar;
