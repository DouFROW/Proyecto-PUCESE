import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ViewLoanApplicationsPage = ({ autoOpenSocio }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationDetailsOpen, setApplicationDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [success, setSuccess] = useState({
    show: false,
    message: "",
    type: "",
  });

  const initialApplications = [
    {
      id: "SOL-2023-001",
      socio: "Carlos Mendoza",
      socioId: "#AET-0212",
      monto: "$2,500.00",
      plazo: "12 meses",
      fechaSolicitud: "12/08/2023",
      estado: "Pendiente",
      motivo: "Emergencia médica",
      ingresos: "$1,500.00",
      gastos: "$1,200.00",
      capacidadPago: "$300.00",
      documentos: ["Cédula", "Comprobante de ingresos", "Certificado laboral"],
      observaciones: "Socio con buen historial crediticio",
    },
    {
      id: "SOL-2023-002",
      socio: "Roberto Pazmiño",
      socioId: "#AET-0225",
      monto: "$3,500.00",
      plazo: "24 meses",
      fechaSolicitud: "10/08/2023",
      estado: "Pendiente",
      motivo: "Compra de electrodomésticos",
      ingresos: "$1,800.00",
      gastos: "$1,400.00",
      capacidadPago: "$400.00",
      documentos: ["Cédula", "Comprobante de ingresos"],
      observaciones: "Primera solicitud de préstamo",
    },
    {
      id: "SOL-2023-003",
      socio: "Patricia López",
      socioId: "#AET-0195",
      monto: "$1,800.00",
      plazo: "18 meses",
      fechaSolicitud: "08/08/2023",
      estado: "En Revisión",
      motivo: "Reparación de vehículo",
      ingresos: "$1,200.00",
      gastos: "$900.00",
      capacidadPago: "$300.00",
      documentos: [
        "Cédula",
        "Comprobante de ingresos",
        "Certificado laboral",
        "Presupuesto de reparación",
      ],
      observaciones: "Documentación completa",
    },
    {
      id: "SOL-2023-004",
      socio: "Miguel Torres",
      socioId: "#AET-0201",
      monto: "$4,000.00",
      plazo: "24 meses",
      fechaSolicitud: "05/08/2023",
      estado: "Aprobado",
      motivo: "Mejoras en vivienda",
      ingresos: "$2,000.00",
      gastos: "$1,500.00",
      capacidadPago: "$500.00",
      documentos: [
        "Cédula",
        "Comprobante de ingresos",
        "Certificado laboral",
        "Presupuesto de mejoras",
      ],
      observaciones: "Socio con excelente historial",
    },
    {
      id: "SOL-2023-005",
      socio: "María González",
      socioId: "#AET-0198",
      monto: "$3,000.00",
      plazo: "15 meses",
      fechaSolicitud: "15/08/2023",
      estado: "Aprobado",
      motivo: "Gastos educativos",
      ingresos: "$1,600.00",
      gastos: "$1,100.00",
      capacidadPago: "$500.00",
      documentos: ["Cédula", "Comprobante de ingresos", "Certificado laboral"],
      observaciones: "Excelente historial de pagos",
    },
    {
      id: "SOL-2023-006",
      socio: "Ana Torres",
      socioId: "#AET-0187",
      monto: "$4,200.00",
      plazo: "20 meses",
      fechaSolicitud: "10/08/2023",
      estado: "Aprobado",
      motivo: "Renovación de negocio",
      ingresos: "$2,200.00",
      gastos: "$1,600.00",
      capacidadPago: "$600.00",
      documentos: [
        "Cédula",
        "Comprobante de ingresos",
        "Certificado laboral",
        "Plan de negocio",
      ],
      observaciones: "Socio con negocio establecido",
    },
  ];

  const [loanApplications, setLoanApplications] = useState(initialApplications);

  const statusOptions = ["Pendiente", "En Revisión", "Aprobado", "Rechazado"];

  useEffect(() => {
    if (autoOpenSocio) {
      const application = loanApplications.find(
        (app) => app.socio === autoOpenSocio
      );
      if (application) {
        setSelectedApplication(application);
        setApplicationDetailsOpen(true);
      }
    }
  }, [autoOpenSocio, loanApplications]);

  const filteredApplications = loanApplications.filter((application) => {
    const matchesSearch =
      application.socio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.socioId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !filterStatus || application.estado === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setApplicationDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setApplicationDetailsOpen(false);
    setSelectedApplication(null);
  };

  const handleApprove = (applicationId) => {
    setLoanApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, estado: "Aprobado" } : app
      )
    );
    
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, estado: "Aprobado" });
    }
    
    setSuccess({
      show: true,
      message: "Solicitud aprobada exitosamente",
      type: "success",
    });
    setTimeout(() => setSuccess({ show: false, message: "", type: "" }), 3000);
  };

  const handleReject = (applicationId) => {
    setLoanApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === applicationId ? { ...app, estado: "Rechazado" } : app
      )
    );
    
    if (selectedApplication && selectedApplication.id === applicationId) {
      setSelectedApplication({ ...selectedApplication, estado: "Rechazado" });
    }
    
    setSuccess({ 
      show: true, 
      message: "Solicitud rechazada", 
      type: "error" 
    });
    setTimeout(() => setSuccess({ show: false, message: "", type: "" }), 3000);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log("Exportando PDF...");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Aprobado":
        return "success";
      case "En Revisión":
        return "warning";
      case "Pendiente":
        return "info";
      case "Rechazado":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <AssignmentIcon sx={{ fontSize: 32, color: "#0056b3" }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Ver Solicitudes de Préstamos
        </Typography>
      </Stack>

      {success.show && (
        <Alert severity={success.type} sx={{ mb: 3 }}>
          {success.message}
        </Alert>
      )}

      <Card
        sx={{
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          mb: 3,
        }}
      >
        <CardHeader
          title="Filtros y Búsqueda"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar por socio, ID de solicitud..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
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

      <Card
        id="activeLoansTable"
        sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}
      >
        <CardHeader
          title={`Solicitudes de Préstamos (${filteredApplications.length})`}
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    ID Solicitud
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Socio</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Monto</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Plazo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Fecha Solicitud
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Motivo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((application, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {application.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {application.socio}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {application.socioId}
                      </Typography>
                    </TableCell>
                    <TableCell>{application.monto}</TableCell>
                    <TableCell>{application.plazo}</TableCell>
                    <TableCell>{application.fechaSolicitud}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 150 }}>
                        {application.motivo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={application.estado}
                        color={getStatusColor(application.estado)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetails(application)}
                          title="Ver detalles"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        {application.estado === "Pendiente" ||
                        application.estado === "En Revisión" ? (
                          <>
                            <IconButton
                              color="success"
                              onClick={() => handleApprove(application.id)}
                              title="Aprobar"
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() => handleReject(application.id)}
                              title="Rechazar"
                            >
                              <CloseIcon />
                            </IconButton>
                          </>
                        ) : null}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredApplications.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron solicitudes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {searchTerm || filterStatus
                  ? "Intenta con otros filtros de búsqueda"
                  : "No hay solicitudes que mostrar"}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={applicationDetailsOpen}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AssignmentIcon color="primary" />
          Detalles de la Solicitud
        </DialogTitle>
        <DialogContent>
          {selectedApplication && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {selectedApplication.id}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Socio: {selectedApplication.socio} (
                  {selectedApplication.socioId})
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Información del Préstamo
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Monto Solicitado:</strong>{" "}
                    {selectedApplication.monto}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Plazo:</strong> {selectedApplication.plazo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha de Solicitud:</strong>{" "}
                    {selectedApplication.fechaSolicitud}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Motivo:</strong> {selectedApplication.motivo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estado:</strong>
                    <Chip
                      label={selectedApplication.estado}
                      color={getStatusColor(selectedApplication.estado)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Capacidad de Pago
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Ingresos Mensuales:</strong>{" "}
                    {selectedApplication.ingresos}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Gastos Mensuales:</strong>{" "}
                    {selectedApplication.gastos}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Capacidad de Pago:</strong>{" "}
                    {selectedApplication.capacidadPago}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Documentos Presentados
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {selectedApplication.documentos.map((doc, index) => (
                    <Chip
                      key={index}
                      label={doc}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3" }}>
                  Observaciones
                </Typography>
                <Typography variant="body2">
                  {selectedApplication.observaciones}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} startIcon={<CloseIcon />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewLoanApplicationsPage;
