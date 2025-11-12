import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  Grid,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const activeLoans = [
  {
    id: "P-2023-0015",
    socio: "María González",
    monto: "$3,000.00",
    tasa: "10.5%",
    plazo: "24 meses",
    cuota: "$350.50",
    saldo: "$2,800.50",
    estado: "Al día",
  },
  {
    id: "P-2023-0018",
    socio: "Ana Torres",
    monto: "$4,200.00",
    tasa: "10.5%",
    plazo: "24 meses",
    cuota: "$490.70",
    saldo: "$3,920.70",
    estado: "Al día",
  },
  {
    id: "P-2023-0009",
    socio: "Luis Vásquez",
    monto: "$2,500.00",
    tasa: "10.5%",
    plazo: "18 meses",
    cuota: "$285.75",
    saldo: "$1,200.25",
    estado: "Pendiente",
  },
];

const pendingRequests = [
  { socio: "Carlos Mendoza", monto: "$2,500.00", plazo: "12 meses", fecha: "12/08/2023" },
  { socio: "Roberto Pazmiño", monto: "$3,500.00", plazo: "24 meses", fecha: "10/08/2023" },
];

const amortization = [
  { cuota: "1", fecha: "05/09/2023", capital: "$120.50", interes: "$30.00", total: "$150.50", saldo: "$2,879.50" },
  { cuota: "2", fecha: "05/10/2023", capital: "$121.50", interes: "$29.00", total: "$150.50", saldo: "$2,758.00" },
  { cuota: "3", fecha: "05/11/2023", capital: "$122.50", interes: "$28.00", total: "$150.50", saldo: "$2,635.50" },
];

const LoansPage = () => {
  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#0056b3">
          Gestión de Préstamos
        </Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ backgroundColor: "#0056b3" }}>
          Nuevo Préstamo
        </Button>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <CardHeader title="Préstamos Activos" sx={{ backgroundColor: "#0056b3", color: "white" }} />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Socio</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Tasa</TableCell>
                  <TableCell>Plazo</TableCell>
                  <TableCell>Cuota</TableCell>
                  <TableCell>Saldo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeLoans.map((loan, i) => (
                  <TableRow key={i}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>{loan.socio}</TableCell>
                    <TableCell>{loan.monto}</TableCell>
                    <TableCell>{loan.tasa}</TableCell>
                    <TableCell>{loan.plazo}</TableCell>
                    <TableCell>{loan.cuota}</TableCell>
                    <TableCell>{loan.saldo}</TableCell>
                    <TableCell>
                      <Chip
                        label={loan.estado}
                        color={loan.estado === "Al día" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" color="primary">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                        <Button size="small" variant="outlined" color="warning">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Solicitudes Pendientes" sx={{ backgroundColor: "#0056b3", color: "white" }} />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Socio</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Plazo</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingRequests.map((req, i) => (
                      <TableRow key={i}>
                        <TableCell>{req.socio}</TableCell>
                        <TableCell>{req.monto}</TableCell>
                        <TableCell>{req.plazo}</TableCell>
                        <TableCell>{req.fecha}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Button color="success" variant="outlined" size="small">
                              <CheckIcon fontSize="small" />
                            </Button>
                            <Button color="error" variant="outlined" size="small">
                              <CloseIcon fontSize="small" />
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Tabla de Amortización (Ejemplo)" sx={{ backgroundColor: "#0056b3", color: "white" }} />
            <CardContent>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Cuota</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Capital</TableCell>
                    <TableCell>Interés</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Saldo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {amortization.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>{a.cuota}</TableCell>
                      <TableCell>{a.fecha}</TableCell>
                      <TableCell>{a.capital}</TableCell>
                      <TableCell>{a.interes}</TableCell>
                      <TableCell>{a.total}</TableCell>
                      <TableCell>{a.saldo}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      ...
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoansPage;
