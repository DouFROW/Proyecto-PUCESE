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
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import StatsCard from "../components/StatsCard";
import LoanTable from "../components/LoanTable";
import QuickActions from "../components/QuickActions";
import WelcomeHeader from "../components/WelcomeHeader";
import LoanModal from "../components/LoanModal";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MemberDashboard = ({ activeNav, setActiveNav }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    { icon: GroupsIcon, title: "Datos Personales" },
    {
      icon: AttachMoneyIcon,
      title: "Préstamos Activos",
      number: "$350.50",
      subtitle: "Vence 05/09/2023",
    },
    {
      icon: RequestPageIcon,
      title: "Aportes acumulados",
      number: "$2,840",
      subtitle: "+$120 este mes",
    },
    {
      icon: ContentPasteGoIcon,
      title: "Próximos descuentos",
      number: "2",
      subtitle: "Total $8,500",
    },
  ];

  const loanRows = [
    {
      Monto: "$5,000.00",
      Fecha: "15/03/2023",
      Plazo: "24 meses",
      "Cuota Mensual": "$350.50",
      Estado: "Activo",
      Acciones: "Ver Detalles",
    },
    {
      Monto: "$2,500.00",
      Fecha: "10/06/2022",
      Plazo: "12 meses",
      "Cuota Mensual": "$285.75",
      Estado: "Pagado",
      Acciones: "Ver Historial",
    },
    {
      Monto: "$3,000.00",
      Fecha: "20/01/2021",
      Plazo: "18 meses",
      "Cuota Mensual": "$305.20",
      Estado: "Pagado",
      Acciones: "Ver Historial",
    },
  ];

  const paymentData = {
    labels: ["Jul", "Ago", "Sep", "Oct", "Nov", "Dic", "Ene 2024"],
    datasets: [
      {
        label: "Proyección de Pagos",
        data: [350, 350, 350, 350, 350, 350, 350],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => `$${value}` },
      },
    },
  };

  const documents = [
    {
      title: "Estatutos Actualizados 2023",
      subtitle: "Actualización de estatutos aprobada en asamblea.",
      date: "Hace 3 días",
    },
    {
      title: "Normativa de Préstamos",
      subtitle: "Nueva normativa para solicitud de préstamos.",
      date: "Hace 1 semana",
    },
    {
      title: "Acta de Asamblea General",
      subtitle: "Acta de la última asamblea general ordinaria.",
      date: "Hace 2 semanas",
    },
  ];

  const handleLoanAction = (row) => {
    // Redirige a la vista de préstamos activos del usuario
    if (setActiveNav) {
      setActiveNav("my-active-loans");
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#f5f5f5" }}>
      <WelcomeHeader
        title="Bienvenido, Juan Pérez"
        subtitle="Número de socio: #AET-0248"
      />
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} width="23.5%">
            <StatsCard {...stat} height="50%" />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} md={8} width="39%">
          <Card
            sx={{
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Mis Préstamos
                </Typography>
              }
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setModalOpen(true)}
                  sx={{
                    backgroundColor: "#0056b3",
                    "&:hover": { backgroundColor: "#003d7a" },
                  }}
                >
                  Solicitar Préstamo
                </Button>
              }
            />

            <Divider />
            <CardContent>
              <LoanTable
                rows={loanRows}
                isAdmin={false}
                onActionClick={handleLoanAction}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Próximos Pagos
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <Line data={paymentData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} width="30%">
          <Card
            sx={{
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              borderRadius: "10px",
            }}
          >
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Documentos Recientes
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <List>
                {documents.map((doc, index) => (
                  <ListItem
                    key={index}
                    component="button"
                    divider={index < documents.length - 1}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "medium", color: "black" }}
                          >
                            {doc.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doc.date}
                          </Typography>
                        </Box>
                      }
                      secondary={doc.subtitle}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <LoanModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
};

export default MemberDashboard;
