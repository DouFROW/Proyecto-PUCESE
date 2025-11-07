
import React, { useState } from 'react';
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
  Divider
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

const AddMemberPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    telefono: '',
    departamento: '',
    fechaIngreso: '',
    Numerodecuenta: '',
    direccion: '',
    tipodecuenta: '',
    nombrebank:''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const departamentos = [
    'Administración',
    'Contabilidad',
    'Sistemas',
    'Talento Humano',
    'Mantenimiento',
    'Seguridad',
    'Otro'
  ];
  const tipodecuenta = [
    'Cuenta Corriente',
    'Cuenta Ahorro',
  ];
  const rol = [
    'Socio',
    'Administración',
    'User Normal',
  ];


  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.cedula.trim()) newErrors.cedula = 'La cédula es requerida';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.departamento) newErrors.departamento = 'El departamento es requerido';
    if (!formData.fechaIngreso) newErrors.fechaIngreso = 'La fecha de ingreso es requerida';
    if (!formData.salario.trim()) newErrors.tipodecuenta = 'El salario es requerido';
    else if (isNaN(formData.salario) || parseFloat(formData.salario) <= 0) {
      newErrors.salario = 'El salario debe ser un número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Datos del nuevo socio:', formData);
      setSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          nombre: '',
          apellido: '',
          cedula: '',
          email: '',
          telefono: '',
          departamento: '',
          fechaIngreso: '',
          salario: '',
          direccion: '',
          tipodecuenta: '',
          nombrebank: '',
        });
        setSuccess(false);
      }, 3000);
    }
  };

  const handleClear = () => {
    setFormData({
      nombre: '',
      apellido: '',
      cedula: '',
      email: '',
      telefono: '',
      departamento: '',
      fechaIngreso: '',
      numerodecuenta: '',
      direccion: '',
      tipodecuenta: '',
      nombrebank: '',
    });
    setErrors({});
    setSuccess(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PersonAddIcon sx={{ fontSize: 32, color: '#0056b3' }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Agregar Nuevo Socio
        </Typography>
      </Stack>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          ¡Socio agregado exitosamente! Se ha generado el número de socio #AET-XXXX.
        </Alert>
      )}

      <Card sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title="Información Personal" 
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Información Básica */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3', fontWeight: 'bold' }}>
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange('nombre')}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  value={formData.apellido}
                  onChange={handleInputChange('apellido')}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cédula"
                  value={formData.cedula}
                  onChange={handleInputChange('cedula')}
                  error={!!errors.cedula}
                  helperText={errors.cedula}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={formData.direccion}
                  onChange={handleInputChange('direccion')}
                  multiline
                  rows={2}
                />
              </Grid>

              {/* Información Laboral */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3', fontWeight: 'bold', mt: 2 }}>
                  Información Laboral
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.departamento}>
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    value={formData.departamento}
                    onChange={handleInputChange('departamento')}
                    label="Departamento"
                  >
                    {departamentos.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.departamento && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors.departamento}
                  </Typography>
                )}
              </Grid>

               <Grid item xs={12} md={6}>
                <FormControl fullWidth required error={!!errors.departamento}>
                  <InputLabel>Rol</InputLabel>
                  <Select
                    value={formData.rol}
                    onChange={handleInputChange('rol')}
                    label="rol"
                  >
                    {rol.map((ro) => (
                      <MenuItem key={ro} value={ro}>
                        {ro}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.departamento && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                    {errors.rol}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha de Ingreso"
                  type="date"
                  value={formData.fechaIngreso}
                  onChange={handleInputChange('fechaIngreso')}
                  error={!!errors.fechaIngreso}
                  helperText={errors.fechaIngreso}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

               <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Nombre del Banco"
                  value={formData.nombrebank}
                  onChange={handleInputChange('nombrebank')}
                  error={!!errors.nombrebank}
                  helperText={errors.nombrebank}
                  required
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Número de cuenta"
                  type="number"
                  value={formData.numerodecuenta}
                  onChange={handleInputChange('numerodecuenta')}
                  error={!!errors.numerodecuenta}
                  helperText={errors.numerodecuenta}
                  required
                />
              </Grid>

               <Grid item xs={12} md={3}>
                <FormControl fullWidth required error={!!errors.tipodecuenta}>
                  <InputLabel>Tipo de cuenta</InputLabel>
                  <Select
                    value={formData.tipodecuenta}
                    onChange={handleInputChange('tipodecuenta')}
                    label="Tipo de cuenta"
                  >
                    {tipodecuenta.map((tdc) => (
                      <MenuItem key={tdc} value={tdc}>
                        {tdc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.tipodecuenta && (
                  <Typography variant="caption" color="error" sx={{ mt: 1.5, ml: 8.75 }}>
                    {errors.tipodecuenta}
                  </Typography>
                )}
              </Grid>

              {/* Información de Contacto */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3', fontWeight: 'bold', mt: 2 }}>
                  Información de Contacto
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange('telefono')}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                  required
                />
              </Grid>

              {/* Botones de Acción */}
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ClearIcon />}
                    onClick={handleClear}
                    sx={{ color: '#0056b3', borderColor: '#0056b3' }}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{ backgroundColor: '#0056b3' }}
                  >
                    Guardar Socio
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
