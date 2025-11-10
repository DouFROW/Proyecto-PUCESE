import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupIcon from "@mui/icons-material/Group";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const pieData = [
  { name: "Al día", value: 65 },
  { name: "Pendientes", value: 20 },
  { name: "Morosos", value: 15 },
];

const COLORS = ["#4caf50", "#ffeb3b", "#f44336"];

const lineData = [
  { name: "Ene", préstamos: 32 },
  { name: "Feb", préstamos: 35 },
  { name: "Mar", préstamos: 38 },
  { name: "Abr", préstamos: 36 },
  { name: "May", préstamos: 40 },
  { name: "Jun", préstamos: 38 },
  { name: "Jul", préstamos: 42 },
  { name: "Ago", préstamos: 42 },
];

const ReportsPage = () => {
  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#0056b3">
          Reportes y Estadísticas
        </Typography>
        <Button variant="contained" startIcon={<PictureAsPdfIcon />} sx={{ backgroundColor: "#0056b3" }}>
          Generar Reporte
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardHeader title="Generar Reportes" sx={{ backgroundColor: "#0056b3", color: "white" }} />
        <CardContent>
          <Grid container spacing={3} mb={3}>
            {[
              { icon: <ReceiptLongIcon sx={{ fontSize: 40, color: "#0056b3" }} />, title: "Reporte de Préstamos", desc: "Genera reportes detallados de préstamos activos, pagados y morosos" },
              { icon: <GroupIcon sx={{ fontSize: 40, color: "#0056b3" }} />, title: "Reporte de Socios", desc: "Listado completo de socios con información detallada y estado de cuenta" },
              { icon: <ShowChartIcon sx={{ fontSize: 40, color: "#0056b3" }} />, title: "Reporte Financiero", desc: "Reportes de ingresos, egresos y estado financiero de la asociación" },
            ].map((r, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card sx={{ textAlign: "center", p: 2, height: "100%" }}>
                  <Box>{r.icon}</Box>
                  <Typography fontWeight="bold" mt={1}>{r.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>{r.desc}</Typography>
                  <Button variant="outlined" sx={{ color: "#0056b3", borderColor: "#0056b3" }}>Generar</Button>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Préstamos por Estado" sx={{ backgroundColor: "#0056b3", color: "white" }} />
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <PieChart width={300} height={300}>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Evolución de Préstamos" sx={{ backgroundColor: "#0056b3", color: "white" }} />
                <CardContent>
                  <LineChart width={500} height={250} data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="préstamos" stroke="#0056b3" />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;
