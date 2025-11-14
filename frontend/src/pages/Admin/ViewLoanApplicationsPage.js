import React, { useState, useEffect } from "react";
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
  Paper,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ViewLoanApplicationsPage = ({ autoOpenSocio }) => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applicationDetailsOpen, setApplicationDetailsOpen] = useState(false);
  const [success, setSuccess] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [error, setError] = useState("");

  // 🟢 Cargar solicitudes de préstamo desde el backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:3000/prestamos");
        if (!response.ok) throw new Error("Error al obtener préstamos");
        const data = await response.json();

        // Formatear para el frontend
        const formatted = data.map((p) => ({
          id: p.codigo_solicitud,
          socio: `${p.socio.nombre} ${p.socio.apellido}`,
          socioId: p.socio.codigo_socio,
          monto: `$${parseFloat(p.monto).toLocaleString("es-ES", {
            minimumFractionDigits: 2,
          })}`,
          plazo: `${p.plazo} meses`,
          fechaSolicitud: new Date(p.fecha_solicitud).toLocaleDateString(
            "es-ES"
          ),
          estado: p.estado,
          motivo: p.motivo ?? "—",
        }));

        setLoanApplications(formatted);
      } catch (err) {
        console.error("❌ Error cargando préstamos:", err);
        setError("Error al cargar las solicitudes de préstamo");
      }
    };

    fetchLoans();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setApplicationDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setApplicationDetailsOpen(false);
    setSelectedApplication(null);
  };

  const handleApprove = (applicationId) => {
    setLoanApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, estado: "Aprobado" } : app
      )
    );
    if (selectedApplication?.id === applicationId)
      setSelectedApplication({ ...selectedApplication, estado: "Aprobado" });

    setSuccess({
      show: true,
      message: "Solicitud aprobada exitosamente",
      type: "success",
    });
    setTimeout(() => setSuccess({ show: false, message: "", type: "" }), 3000);
  };

  const handleReject = (applicationId) => {
    setLoanApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, estado: "Rechazado" } : app
      )
    );
    if (selectedApplication?.id === applicationId)
      setSelectedApplication({ ...selectedApplication, estado: "Rechazado" });

    setSuccess({
      show: true,
      message: "Solicitud rechazada",
      type: "error",
    });
    setTimeout(() => setSuccess({ show: false, message: "", type: "" }), 3000);
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success.show && (
        <Alert severity={success.type} sx={{ mb: 3 }}>
          {success.message}
        </Alert>
      )}

      <Card
        sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}
      >
        <CardHeader
          title={`Solicitudes de Préstamos (${loanApplications.length})`}
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "ID Solicitud",
                    "Socio",
                    "Monto",
                    "Plazo",
                    "Fecha Solicitud",
                    "Motivo",
                    "Estado",
                    "Acciones",
                  ].map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loanApplications.map((application, index) => (
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
                        sx={{
                          width: 110,
                          borderRadius: 1,
                          justifyContent: "center",
                          fontSize: "0.85rem",
                        }}
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
                        {(application.estado === "Pendiente" ||
                          application.estado === "En Revisión") && (
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
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* === Diálogo Detalles === */}
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
            <Stack spacing={1}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {selectedApplication.id}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Socio: {selectedApplication.socio} (
                {selectedApplication.socioId})
              </Typography>
              <Typography>
                <strong>Monto:</strong> {selectedApplication.monto}
              </Typography>
              <Typography>
                <strong>Plazo:</strong> {selectedApplication.plazo}
              </Typography>
              <Typography>
                <strong>Fecha de Solicitud:</strong>{" "}
                {selectedApplication.fechaSolicitud}
              </Typography>
              <Typography>
                <strong>Motivo:</strong> {selectedApplication.motivo}
              </Typography>
              <Typography>
                <strong>Estado:</strong>{" "}
                <Chip
                  label={selectedApplication.estado}
                  color={getStatusColor(selectedApplication.estado)}
                  size="small"
                />
              </Typography>
            </Stack>
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
