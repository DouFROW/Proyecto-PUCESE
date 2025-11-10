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
import { addMember } from '../api/api.js';

const handleAddMember = async () => {
  const newMember = { nombre: 'Mateo', cedula: '1234567890' };
  const response = await addMember(newMember);
   console.log(response);
};

  const AddMemberPage = () => {
  const [formData, setFormData] = useState({
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

  const tipodecuenta = ["Cuenta Corriente", "Cuenta Ahorro"];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
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

          // Limpiar formulario después de 3 segundos
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

      <Card
        sx={{ boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "10px" }}
      >
        <CardHeader
          title="Información Personal"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Información Básica */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#0056b3", fontWeight: "bold" }}
                >
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cédula"
                  value={formData.cedula}
                  onChange={handleInputChange("cedula")}
                  error={!!errors.cedula}
                  helperText={errors.cedula}
                  required
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={formData.direccion}
                  onChange={handleInputChange("direccion")}
                  multiline
                  rows={2}
                  disabled={loading}
                />
              </Grid>

              {/* Información Laboral */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}
                >
                  Información Laboral
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

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
                {errors.departamento && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.75 }}
                  >
                    {errors.departamento}
                  </Typography>
                )}
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

              {/* Información Bancaria */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}
                >
                  Información Bancaria
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={4}>
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

              <Grid item xs={12} md={4}>
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

              <Grid item xs={12} md={4}>
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
                {errors.tipodecuenta && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1.75 }}
                  >
                    {errors.tipodecuenta}
                  </Typography>
                )}
              </Grid>

              {/* Información de Contacto */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#0056b3", fontWeight: "bold", mt: 2 }}
                >
                  Información de Contacto
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange("telefono")}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                  required
                  disabled={loading}
                />
              </Grid>

              {/* Botones de Acción */}
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                  sx={{ mt: 3 }}
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
