import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  PersonRemove as PersonRemoveIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const DeactivateMemberPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deactivatedMemberName, setDeactivatedMemberName] = useState("");
  const [actionType, setActionType] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError("");

        // 🟩 1️⃣ Obtener socios
        const sociosResponse = await fetch("http://localhost:3000/socios");
        if (!sociosResponse.ok) throw new Error("Error al cargar socios");
        const sociosData = await sociosResponse.json();

        // 🟦 2️⃣ Obtener préstamos
        const prestamosResponse = await fetch(
          "http://localhost:3000/prestamos"
        );
        if (!prestamosResponse.ok) throw new Error("Error al cargar préstamos");
        const prestamosData = await prestamosResponse.json();

        // 🟧 3️⃣ Contar préstamos activos por socio
        const prestamosPorSocio = {};
        prestamosData.forEach((p) => {
          if (["Pendiente", "En Revisión", "Aprobado"].includes(p.estado)) {
            prestamosPorSocio[p.socio_id] =
              (prestamosPorSocio[p.socio_id] || 0) + 1;
          }
        });

        // 🟨 4️⃣ Combinar datos de socios + préstamos
        const formattedMembers = sociosData.map((socio) => ({
          id: socio.codigo_socio,
          id_socio: socio.id_socio || socio.id,
          nombre: `${socio.nombre} ${socio.apellido}`,
          departamento: socio.departamento,
          fechaIngreso: new Date(socio.fecha_ingreso).toLocaleDateString(
            "es-ES"
          ),
          prestamosActivos: prestamosPorSocio[socio.id_socio || socio.id] || 0,
          estado: socio.estado,
          salario: socio.salario
            ? `$${parseFloat(socio.salario).toLocaleString("es-ES", {
                minimumFractionDigits: 2,
              })}`
            : "$0.00",
          fechaActivacion: socio.fecha_activacion
            ? new Date(socio.fecha_activacion).toLocaleDateString("es-ES")
            : null,
          fechaDesactivacion: socio.fecha_desactivacion
            ? new Date(socio.fecha_desactivacion).toLocaleDateString("es-ES")
            : null,
          email: socio.email,
          telefono: socio.telefono,
        }));

        setMembers(formattedMembers);
      } catch (err) {
        console.error("❌ Error al cargar socios:", err);
        setError("No se pudieron cargar los socios o préstamos.");
        showSnackbar("Error al cargar socios", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const handleConfirmDeactivation = async () => {
    try {
      const isActivating = selectedMember.estado === "Inactivo";
      const endpoint = isActivating
        ? `http://localhost:3000/socios/activar/${selectedMember.id_socio}`
        : `http://localhost:3000/socios/desactivar/${selectedMember.id_socio}`;

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error al actualizar el estado del socio"
        );
      }

      const updatedMembers = members.map((member) =>
        member.id_socio === selectedMember.id_socio
          ? {
              ...member,
              estado: isActivating ? "Activo" : "Inactivo",
              fechaActivacion: isActivating
                ? new Date().toLocaleDateString("es-ES")
                : member.fechaActivacion,
              fechaDesactivacion: !isActivating
                ? new Date().toLocaleDateString("es-ES")
                : null,
            }
          : member
      );

      setMembers(updatedMembers);
      setDeactivatedMemberName(selectedMember.nombre);
      setSuccess(true);
      setConfirmDialogOpen(false);
      setSelectedMember(null);

      showSnackbar(
        isActivating
          ? `✅ Socio ${selectedMember.nombre} activado exitosamente`
          : `✅ Socio ${selectedMember.nombre} desactivado exitosamente`,
        "success"
      );

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error al actualizar socio:", err);
      showSnackbar(err.message, "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredMembers = members.filter(
    (m) =>
      m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeactivateClick = (member) => {
    setSelectedMember(member);
    setActionType(member.estado === "Inactivo" ? "activar" : "desactivar");
    setConfirmDialogOpen(true);
  };

  const handleCancelDeactivation = () => {
    setConfirmDialogOpen(false);
    setSelectedMember(null);
  };

  const handleReload = async () => {
    setLoading(true);
    setError("");
    try {
      // 🟩 1️⃣ Obtener socios
      const sociosResponse = await fetch("http://localhost:3000/socios");
      if (!sociosResponse.ok) throw new Error("Error al cargar socios");
      const sociosData = await sociosResponse.json();

      // 🟦 2️⃣ Obtener préstamos
      const prestamosResponse = await fetch("http://localhost:3000/prestamos");
      if (!prestamosResponse.ok) throw new Error("Error al cargar préstamos");
      const prestamosData = await prestamosResponse.json();

      // 🟧 3️⃣ Contar préstamos activos por socio
      const prestamosPorSocio = {};
      prestamosData.forEach((p) => {
        if (["Pendiente", "En Revisión", "Aprobado"].includes(p.estado)) {
          prestamosPorSocio[p.socio_id] =
            (prestamosPorSocio[p.socio_id] || 0) + 1;
        }
      });

      // 🟨 4️⃣ Combinar socios + préstamos
      const formattedMembers = sociosData.map((socio) => ({
        id: socio.codigo_socio,
        id_socio: socio.id_socio || socio.id,
        nombre: `${socio.nombre} ${socio.apellido}`,
        departamento: socio.departamento,
        fechaIngreso: socio.fecha_ingreso
          ? new Date(socio.fecha_ingreso).toLocaleDateString("es-ES")
          : "",
        prestamosActivos: prestamosPorSocio[socio.id_socio || socio.id] || 0,
        estado: socio.estado,
        salario: socio.salario
          ? `$${parseFloat(socio.salario).toLocaleString("es-ES", {
              minimumFractionDigits: 2,
            })}`
          : "$0.00",
        fechaActivacion: socio.fecha_activacion
          ? new Date(socio.fecha_activacion).toLocaleDateString("es-ES")
          : null,
        fechaDesactivacion: socio.fecha_desactivacion
          ? new Date(socio.fecha_desactivacion).toLocaleDateString("es-ES")
          : null,
        email: socio.email,
        telefono: socio.telefono,
      }));

      setMembers(formattedMembers);
    } catch (err) {
      console.error("❌ Error al recargar socios:", err);
      setError("Error al recargar socios o préstamos.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button
            variant="contained"
            onClick={handleReload}
            sx={{ backgroundColor: "#0056b3" }}
          >
            Reintentar
          </Button>
        </Box>
      );
    }

    if (members.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <PersonRemoveIcon sx={{ fontSize: 64, color: "#9e9e9e", mb: 2 }} />
          <Typography variant="h5" color="textSecondary" gutterBottom>
            No hay socios registrados
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Agrega socios desde la página "Agregar Nuevo Socio" para poder
            gestionar sus estados.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0056b3" }}
            onClick={() => (window.location.href = "/add-member")}
          >
            Agregar Primer Socio
          </Button>
        </Box>
      );
    }

    if (filteredMembers.length === 0) {
      return (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron socios
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {searchTerm
              ? "Intenta con otros términos de búsqueda"
              : "No hay socios que coincidan con los filtros"}
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Departamento</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha Ingreso</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell>
                <strong>Préstamos Activos</strong>
              </TableCell>
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id_socio} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {member.id}
                  </Typography>
                </TableCell>
                <TableCell>{member.nombre}</TableCell>
                <TableCell>{member.departamento}</TableCell>
                <TableCell>{member.fechaIngreso}</TableCell>
                <TableCell>
                  <Chip
                    label={member.estado}
                    color={member.estado === "Activo" ? "success" : "default"}
                    variant={member.estado === "Activo" ? "filled" : "outlined"}
                    sx={{
                      width: 100,
                      borderRadius: 1,
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      height: 32,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={member.prestamosActivos}
                    color={member.prestamosActivos > 0 ? "warning" : "default"}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color={member.estado === "Inactivo" ? "success" : "error"}
                    size="small"
                    onClick={() => handleDeactivateClick(member)}
                    disabled={member.prestamosActivos > 0}
                    startIcon={
                      member.estado === "Inactivo" ? (
                        <CheckIcon />
                      ) : (
                        <PersonRemoveIcon />
                      )
                    }
                  >
                    {member.estado === "Inactivo" ? "Activar" : "Desactivar"}
                  </Button>
                  {member.prestamosActivos > 0 && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      display="block"
                      sx={{ mt: 0.5 }}
                    >
                      Tiene préstamos activos
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PersonRemoveIcon sx={{ fontSize: 32, color: "#0056b3" }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Gestionar Estado de Socios
        </Typography>
      </Stack>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionType === "activar"
            ? `¡Socio activado exitosamente! ${deactivatedMemberName} ha sido reactivado.`
            : `¡Socio desactivado exitosamente! ${deactivatedMemberName} ha sido desactivado.`}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="Buscar Socio"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
          action={
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={handleReload}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Actualizar"}
            </Button>
          }
        />
        <CardContent>
          <TextField
            fullWidth
            placeholder="Buscar por nombre, ID o departamento..."
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title={`Lista de Socios (${filteredMembers.length})`}
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>{renderContent()}</CardContent>
      </Card>

      {/* Diálogo de Confirmación */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelDeactivation}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color="warning" />
          {selectedMember?.estado === "Inactivo"
            ? "Confirmar Activación de Socio"
            : "Confirmar Desactivación de Socio"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿Está seguro de que desea {actionType} al siguiente socio?
          </Typography>

          {selectedMember && (
            <Box
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedMember.nombre}
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {selectedMember.id}
              </Typography>
              <Typography variant="body2">
                <strong>Departamento:</strong> {selectedMember.departamento}
              </Typography>
              <Typography variant="body2">
                <strong>Fecha Ingreso:</strong> {selectedMember.fechaIngreso}
              </Typography>
              <Typography variant="body2">
                <strong>Préstamos Activos:</strong>{" "}
                {selectedMember.prestamosActivos}
              </Typography>
            </Box>
          )}

          <Alert severity="warning" sx={{ borderRadius: 2 }}>
            <strong>Importante:</strong> Esta acción{" "}
            {actionType === "activar" ? "activará" : "desactivará"} el socio
            pero <strong>NO eliminará sus datos</strong>. El socio podrá ser
            {actionType === "activar" ? " desactivado " : " reactivado "} en el
            futuro si es necesario.
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDeactivation} startIcon={<CloseIcon />}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDeactivation}
            variant="contained"
            color={selectedMember?.estado === "Inactivo" ? "success" : "error"}
            startIcon={<CheckIcon />}
          >
            {selectedMember?.estado === "Inactivo"
              ? "Confirmar Activación"
              : "Confirmar Desactivación"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DeactivateMemberPage;
