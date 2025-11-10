import React, { useState } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  Typography,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import StatsCard from "../components/StatsCard";
import LoanTable from "../components/LoanTable";
import QuickActions from "../components/QuickActions";
import LoanModal from "../components/LoanModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import GroupIcon from "@mui/icons-material/Group";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CloseIcon from "@mui/icons-material/Close";
import WelcomeHeader from "../components/WelcomeHeader";

const AdminDashboard = ({ admin, setActiveNav }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    {
      icon: GroupIcon,
      title: "Total Socios",
      number: "248",
      subtitle: "+5 este mes",
    },
    {
      icon: AccountBalanceIcon,
      title: "Préstamos Activos",
      number: "42",
      subtitle: "$125,800 total",
    },
    {
      icon: MonetizationOnIcon,
      title: "Ingresos del Mes",
      number: "$12,580",
      subtitle: "+$1,240 vs mes anterior",
    },
    {
      icon: TrendingDownIcon,
      title: "Egresos del Mes",
      number: "$8,340",
      subtitle: "+$420 vs mes anterior",
    },
  ];

  const loanRows = [
    {
      Socio: "María González",
      Monto: "$3,000.00",
      Fecha: "15/08/2023",
      Estado: "Aprobado",
      Acciones: "Ver",
    },
    {
      Socio: "Carlos Mendoza",
      Monto: "$2,500.00",
      Fecha: "12/08/2023",
      Estado: "Pendiente",
      Acciones: "Revisar",
    },
    {
      Socio: "Ana Torres",
      Monto: "$4,200.00",
      Fecha: "10/08/2023",
      Estado: "Aprobado",
      Acciones: "Ver",
    },
  ];

  const pendingRequests = [
    {
      title: "Solicitud de Préstamo",
      name: "Carlos Mendoza - $2,500.00",
      status: "Pendiente de revisión",
      date: "Hoy",
    },
    {
      title: "Actualización de Datos",
      name: "María González",
      status: "Esperando verificación",
      date: "Ayer",
    },
  ];

  const handleRegisterMember = () => {
    if (setActiveNav) {
      setActiveNav("add-member");
    }
  };

  const handleGenerateReport = () => {
    if (setActiveNav) {
      setActiveNav("monthly-discount-report");
    }
  };

  const handleLoanApplications = () => {
    if (setActiveNav) {
      setActiveNav("view-loan-applications");
    }
  };

  const handleLoanAction = (row) => {
    if (setActiveNav) {
      setActiveNav("view-loan-applications", { autoOpenSocio: row.Socio });
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
      <WelcomeHeader
        title="Panel de Administración - AETPUCE"
        subtitle="Sistema integral para la administración de la asociación"
      />
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} width="23.5%">
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "6px" }}
          >
            <CardHeader
              title="Préstamos Recientes"
              titleTypographyProps={{
                variant: "subtitle1",
                fontWeight: "bold",
              }}
              action={
                <Button
                  size="small"
                  sx={{
                    backgroundColor: "#0056b3",
                    color: "white",
                    "&:hover": { backgroundColor: "#003d7a" },
                    fontSize: "0.75rem",
                    textTransform: "none",
                  }}
                  onClick={handleLoanApplications}
                >
                  Ver todos
                </Button>
              }
            />
            <LoanTable rows={loanRows} onActionClick={handleLoanAction} />
          </Card>
        </Grid>

        <Grid item xs={12} md={3} width="30%">
          <Card
            sx={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              borderRadius: "4px",
            }}
          >
            <CardHeader
              title="Solicitudes Pendientes"
              sx={{
                backgroundColor: "#0056b3",
                color: "white",
                "& .MuiCardHeader-title": {
                  fontSize: "1rem",
                  fontWeight: "bold",
                },
              }}
              action={
                <IconButton size="small" sx={{ color: "white" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
            <CardContent sx={{ p: 0 }}>
              <List sx={{ p: 0 }}>
                {pendingRequests.map((request, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        py: 2,
                        px: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          color="text.primary"
                        >
                          {request.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.date}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ mb: 0.5 }}
                      >
                        {request.name}
                      </Typography>
                      <Chip
                        label={request.status}
                        size="small"
                        sx={{
                          fontSize: "0.7rem",
                          height: "20px",
                          backgroundColor: "#e3f2fd",
                          color: "#1976d2",
                        }}
                      />
                    </ListItem>
                    {index < pendingRequests.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3} width="20%">
          <Card
            sx={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "4px" }}
          >
            <CardHeader
              title="Acciones Rápidas"
              titleTypographyProps={{
                variant: "subtitle1",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              <QuickActions
                onLoanRequest={() => setModalOpen(true)}
                onRegisterMember={handleRegisterMember}
                onGenerateReport={handleGenerateReport}
                isAdmin={true}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <LoanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default AdminDashboard;
