import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  Divider,
  CircularProgress,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";

const AddMemberPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    email: "",
    rol: "",
    telefono: "",
    departamento: "",
    fechaIngreso: "",
    numerodecuenta: "",
    direccion: "",
    tipodecuenta: "",
    nombrebank: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codigoSocio, setCodigoSocio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const departamentos = [
    "Administración",
    "Contabilidad",
    "Sistemas",
    "Talento Humano",
    "Mantenimiento",
    "Seguridad",
    "Otro",
  ];

  const rol = ["Administrador", "Rol"];
  const tipodecuenta = ["Cuenta Corriente", "Cuenta Ahorro"];

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;

    // Validación para campos numéricos
    if (["cedula", "telefono", "numerodecuenta"].includes(field)) {
      if (!/^\d*$/.test(value)) return; // Solo permite números
    }

    setFormData({
      ...formData,
      [field]: value,
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido.trim())
      newErrors.apellido = "El apellido es requerido";
    if (!formData.cedula.trim()) newErrors.cedula = "La cédula es requerida";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido";
    if (!formData.telefono.trim())
      newErrors.telefono = "El teléfono es requerido";
    if (!formData.departamento)
      newErrors.departamento = "El departamento es requerido";
    if (!formData.fechaIngreso)
      newErrors.fechaIngreso = "La fecha de ingreso es requerida";
    if (!formData.nombrebank.trim())
      newErrors.nombrebank = "El nombre del banco es requerido";
    if (!formData.numerodecuenta.trim())
      newErrors.numerodecuenta = "El número de cuenta es requerido";
    if (!formData.tipodecuenta)
      newErrors.tipodecuenta = "El tipo de cuenta es requerido";
    if (!formData.direccion)
      newErrors.direccion = "La dirección es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (validateForm()) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/socios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setCodigoSocio(data.codigo_socio);

          setTimeout(() => {
            handleClear();
          }, 3000);
        } else {
          setErrorMessage(data.error || "Error al agregar socio");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage(
          "Error de conexión con el servidor. Verifica que el servidor esté corriendo."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: "",
      apellido: "",
      cedula: "",
      email: "",
      telefono: "",
      departamento: "",
      fechaIngreso: "",
      numerodecuenta: "",
      direccion: "",
      tipodecuenta: "",
      nombrebank: "",
    });
    setErrors({});
    setSuccess(false);
    setErrorMessage("");
    setCodigoSocio("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PersonAddIcon sx={{ fontSize: 32, color: "#0056b3" }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Agregar Nuevo Socio
        </Typography>
      </Stack>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Socio agregado exitosamente! Se ha generado el número de socio:{" "}
          <strong>{codigoSocio}</strong>
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Card sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
        <CardHeader
          title="Información Personal"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Información Básica */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3", fontWeight: "bold" }}>
                  Información Básica
                </Typography>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={formData.nombre}
                        onChange={handleInputChange("nombre")}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                        required
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Apellido"
                        value={formData.apellido}
                        onChange={handleInputChange("apellido")}
                        error={!!errors.apellido}
                        helperText={errors.apellido}
                        required
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Cédula"
                        value={formData.cedula}
                        onChange={handleInputChange("cedula")}
                        error={!!errors.cedula}
                        helperText={errors.cedula}
                        required
                        disabled={loading}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        fullWidth
                        label="Dirección"
                        value={formData.direccion}
                        onChange={handleInputChange("direccion")}
                        error={!!errors.direccion}
                        helperText={errors.direccion}
                        required
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Información de Contacto */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}>
                  Información de Contacto
                </Typography>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        disabled={loading}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        fullWidth
                        label="Teléfono"
                        value={formData.telefono}
                        onChange={handleInputChange("telefono")}
                        error={!!errors.telefono}
                        helperText={errors.telefono}
                        required
                        disabled={loading}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

              {/* Información Laboral y Bancaria */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {/* Laboral */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}>
                      Información Laboral
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required error={!!errors.departamento}>
                            <InputLabel>Departamento</InputLabel>
                            <Select
                              value={formData.departamento}
                              onChange={handleInputChange("departamento")}
                              label="Departamento"
                              disabled={loading}
                            >
                              {departamentos.map((dept) => (
                                <MenuItem key={dept} value={dept}>
                                  {dept}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required error={!!errors.rol}>
                            <InputLabel>Rol</InputLabel>
                            <Select
                              value={formData.rol}
                              onChange={handleInputChange("rol")}
                              label="rol"
                              disabled={loading}
                            >
                              {rol.map((r) => (
                                <MenuItem key={r} value={r}>
                                  {r}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Fecha de Ingreso"
                            type="date"
                            value={formData.fechaIngreso}
                            onChange={handleInputChange("fechaIngreso")}
                            error={!!errors.fechaIngreso}
                            helperText={errors.fechaIngreso}
                            InputLabelProps={{ shrink: true }}
                            required
                            disabled={loading}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Bancaria */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}>
                      Información Bancaria
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Nombre del Banco"
                            value={formData.nombrebank}
                            onChange={handleInputChange("nombrebank")}
                            error={!!errors.nombrebank}
                            helperText={errors.nombrebank}
                            required
                            disabled={loading}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Número de cuenta"
                            value={formData.numerodecuenta}
                            onChange={handleInputChange("numerodecuenta")}
                            error={!!errors.numerodecuenta}
                            helperText={errors.numerodecuenta}
                            required
                            disabled={loading}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required error={!!errors.tipodecuenta}>
                            <InputLabel>Tipo de cuenta</InputLabel>
                            <Select
                              value={formData.tipodecuenta}
                              onChange={handleInputChange("tipodecuenta")}
                              label="Tipo de cuenta"
                              disabled={loading}
                            >
                              {tipodecuenta.map((tdc) => (
                                <MenuItem key={tdc} value={tdc}>
                                  {tdc}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>

                {/* 🔽 Botones debajo de las secciones laboral y bancaria */}
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex"
                  sx={{ mt: 4 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClear}
                    sx={{ color: "#0056b3", borderColor: "#0056b3" }}
                    disabled={loading}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SaveIcon />
                      )
                    }
                    sx={{ backgroundColor: "#0056b3" }}
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : "Guardar Socio"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddMemberPage;
