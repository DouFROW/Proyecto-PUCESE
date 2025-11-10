import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { exportHtmlToPdf } from "../components/pdfUtils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const AnnualDiscountReportPage = () => {
  // Sample data for charts
  const monthlyDiscounts = [
    { mes: "Enero", descuentos: 12500, prestamos: 8500, cuotas: 4000 },
    { mes: "Febrero", descuentos: 13200, prestamos: 9200, cuotas: 4000 },
    { mes: "Marzo", descuentos: 11800, prestamos: 7800, cuotas: 4000 },
    { mes: "Abril", descuentos: 14100, prestamos: 10100, cuotas: 4000 },
    { mes: "Mayo", descuentos: 12900, prestamos: 8900, cuotas: 4000 },
    { mes: "Junio", descuentos: 13500, prestamos: 9500, cuotas: 4000 },
    { mes: "Julio", descuentos: 12200, prestamos: 8200, cuotas: 4000 },
    { mes: "Agosto", descuentos: 13800, prestamos: 9800, cuotas: 4000 },
    { mes: "Septiembre", descuentos: 13100, prestamos: 9100, cuotas: 4000 },
    { mes: "Octubre", descuentos: 12600, prestamos: 8600, cuotas: 4000 },
    { mes: "Noviembre", descuentos: 13400, prestamos: 9400, cuotas: 4000 },
    { mes: "Diciembre", descuentos: 14200, prestamos: 10200, cuotas: 4000 },
  ];

  const departmentDiscounts = [
    { departamento: "Administración", descuentos: 45000, socios: 15 },
    { departamento: "Contabilidad", descuentos: 38000, socios: 12 },
    { departamento: "Sistemas", descuentos: 42000, socios: 18 },
    { departamento: "Recursos Humanos", descuentos: 32000, socios: 10 },
    { departamento: "Mantenimiento", descuentos: 28000, socios: 8 },
    { departamento: "Seguridad", descuentos: 25000, socios: 6 },
  ];

  const discountTypes = [
    { name: "Préstamos", value: 108000, color: "#8884d8" },
    { name: "Cuotas Mensuales", value: 48000, color: "#82ca9d" },
    { name: "Otros", value: 12000, color: "#ffc658" },
  ];

  const topMembers = [
    {
      socio: "Juan Pérez",
      departamento: "Administración",
      descuentos: 4200,
      prestamos: 2,
    },
    {
      socio: "María González",
      departamento: "Contabilidad",
      descuentos: 3800,
      prestamos: 1,
    },
    {
      socio: "Carlos Mendoza",
      departamento: "Sistemas",
      descuentos: 3600,
      prestamos: 1,
    },
    {
      socio: "Ana Torres",
      departamento: "Recursos Humanos",
      descuentos: 3400,
      prestamos: 1,
    },
    {
      socio: "Luis Vásquez",
      departamento: "Mantenimiento",
      descuentos: 3200,
      prestamos: 1,
    },
  ];

  // Function to get current year and past 5 years
  const getYearsList = () => {
    const currentYear = new Date().getFullYear();
    const yearsList = [];

    for (let i = 0; i < 5; i++) {
      yearsList.push((currentYear - i).toString());
    }

    return yearsList;
  };

  const years = getYearsList();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const handlePrintReport = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log("Exporting annual discount report to PDF...");
    exportHtmlToPdf("activeLoansTable", "PrestamosActivos.pdf");
  };

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <AssessmentIcon sx={{ fontSize: 32, color: "#0056b3" }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Reporte Anual de Descuentos
        </Typography>
      </Stack>

      <Card
        sx={{
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          mb: 3,
        }}
      >
        <CardHeader
          title="Configuración del Reporte"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Año</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  label="Año"
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handlePrintReport}
                  sx={{ color: "#0056b3", borderColor: "#0056b3" }}
                >
                  Imprimir
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleExportPDF}
                  sx={{ color: "#0056b3", borderColor: "#0056b3" }}
                >
                  Exportar PDF
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div id="activeLoansTable">
        {/* Resumen Ejecutivo */}
        <Card
          sx={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            mb: 3,
          }}
        >
          <CardHeader
            title={`Resumen Ejecutivo - Año ${selectedYear}`}
            sx={{ backgroundColor: "#0056b3", color: "white" }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    $168,000
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Descuentos
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    color="success.main"
                    fontWeight="bold"
                  >
                    69
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Socios Activos
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="h4"
                    color="warning.main"
                    fontWeight="bold"
                  >
                    $2,435
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Promedio por Socio
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    $26.80
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Cuota Fija Mensual
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Gráficos Estadísticos */}
        <Grid container spacing={3} mb={3}>
          {/* Gráfico de Descuentos Mensuales */}
          <Grid item xs={12} md={8} width="53%">
            <Card
              sx={{
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title="Evolución de Descuentos Mensuales"
                sx={{ backgroundColor: "#0056b3", color: "white" }}
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyDiscounts}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="descuentos"
                      fill="#8884d8"
                      name="Descuentos Totales"
                    />
                    <Bar
                      dataKey="prestamos"
                      fill="#82ca9d"
                      name="Descuentos Préstamos"
                    />
                    <Bar
                      dataKey="cuotas"
                      fill="#ffc658"
                      name="Cuotas Mensuales"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfico de Tipos de Descuentos */}
          <Grid item xs={12} md={4} width="45%">
            <Card
              sx={{
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title="Distribución por Tipo"
                sx={{ backgroundColor: "#0056b3", color: "white" }}
              />
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={discountTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {discountTypes.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráfico de Descuentos por Departamento */}
        <Card
          sx={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            mb: 3,
          }}
        >
          <CardHeader
            title="Descuentos por Departamento"
            sx={{ backgroundColor: "#0056b3", color: "white" }}
          />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={departmentDiscounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="departamento" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="descuentos"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Descuentos ($)"
                />
                <Line
                  type="monotone"
                  dataKey="socios"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Número de Socios"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabla de Top Socios */}
        <Card
          sx={{
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "10px",
            mb: 3,
          }}
        >
          <CardHeader
            title="Top 5 Socios con Mayor Descuento"
            sx={{ backgroundColor: "#0056b3", color: "white" }}
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Socio</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Departamento
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Total Descuentos
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Préstamos</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Promedio Mensual
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topMembers.map((member, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {member.socio}
                        </Typography>
                      </TableCell>
                      <TableCell>{member.departamento}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          color="primary"
                        >
                          ${member.descuentos.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={member.prestamos}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          ${(member.descuentos / 12).toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Desglose de Cuota Fija */}
        <Card
          sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}
        >
          <CardHeader
            title="Desglose de Cuota Fija Mensual"
            sx={{ backgroundColor: "#0056b3", color: "white" }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Componentes de la Cuota Fija
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Ahorro:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      $6.70
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Administración:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      $13.80
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Administración:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      $6.70
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#e3f2fd",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Total:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                    >
                      $26.80
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Resumen Anual
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Cuota fija mensual:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      $26.80
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Socios activos:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      69
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">Meses:</Typography>
                    <Typography variant="body2" fontWeight="bold">
                      12
                    </Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      backgroundColor: "#e8f5e8",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Total anual:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="success.main"
                    >
                      $22,190.40
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default AnnualDiscountReportPage;
