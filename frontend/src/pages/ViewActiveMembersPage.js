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
  Switch,
  FormControlLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { exportHtmlToPdf } from '../components/pdfUtils';

const ViewActiveMembersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDetailsOpen, setMemberDetailsOpen] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState('');
  const [showOnlyWithLoans, setShowOnlyWithLoans] = useState(false);

  // Sample data - in a real app this would come from your backend
  const members = [
    {
      id: '#AET-0248',
      nombre: 'Juan Pérez',
      apellido: 'García',
      departamento: 'Administración',
      fechaIngreso: '15/03/2018',
      prestamosActivos: 1,
      estado: 'Activo',
      salario: '$1,200.00',
      email: 'juan.perez@aetpuce.com',
      telefono: '0987654321',
      direccion: 'Av. Principal 123, Quito',
      fechaNacimiento: '15/05/1985',
      estadoCivil: 'Casado',
      aportesAcumulados: '$2,840.00',
      ultimoAporte: '15/08/2023'
    },
    {
      id: '#AET-0185',
      nombre: 'María González',
      apellido: 'López',
      departamento: 'Contabilidad',
      fechaIngreso: '20/06/2019',
      prestamosActivos: 0,
      estado: 'Activo',
      salario: '$1,350.00',
      email: 'maria.gonzalez@aetpuce.com',
      telefono: '0987654322',
      direccion: 'Calle Secundaria 456, Quito',
      fechaNacimiento: '22/08/1990',
      estadoCivil: 'Soltera',
      aportesAcumulados: '$1,920.00',
      ultimoAporte: '20/08/2023'
    },
    {
      id: '#AET-0212',
      nombre: 'Carlos Mendoza',
      apellido: 'Vásquez',
      departamento: 'Sistemas',
      fechaIngreso: '10/01/2020',
      prestamosActivos: 0,
      estado: 'Activo',
      salario: '$1,500.00',
      email: 'carlos.mendoza@aetpuce.com',
      telefono: '0987654323',
      direccion: 'Av. Norte 789, Quito',
      fechaNacimiento: '10/12/1988',
      estadoCivil: 'Casado',
      aportesAcumulados: '$1,440.00',
      ultimoAporte: '10/08/2023'
    },
    {
      id: '#AET-0198',
      nombre: 'Ana Torres',
      apellido: 'Morales',
      departamento: 'Recursos Humanos',
      fechaIngreso: '05/11/2017',
      prestamosActivos: 1,
      estado: 'Activo',
      salario: '$1,100.00',
      email: 'ana.torres@aetpuce.com',
      telefono: '0987654324',
      direccion: 'Calle Sur 321, Quito',
      fechaNacimiento: '05/03/1987',
      estadoCivil: 'Divorciada',
      aportesAcumulados: '$3,120.00',
      ultimoAporte: '05/08/2023'
    },
    {
      id: '#AET-0154',
      nombre: 'Luis Vásquez',
      apellido: 'Herrera',
      departamento: 'Mantenimiento',
      fechaIngreso: '15/08/2015',
      prestamosActivos: 1,
      estado: 'Activo',
      salario: '$950.00',
      email: 'luis.vasquez@aetpuce.com',
      telefono: '0987654325',
      direccion: 'Av. Este 654, Quito',
      fechaNacimiento: '15/07/1982',
      estadoCivil: 'Casado',
      aportesAcumulados: '$4,560.00',
      ultimoAporte: '15/08/2023'
    }
  ];

  const departments = ['Administración', 'Contabilidad', 'Sistemas', 'Recursos Humanos', 'Mantenimiento'];

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.departamento.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filterDepartment || member.departamento === filterDepartment;
    const matchesLoanFilter = !showOnlyWithLoans || member.prestamosActivos > 0;
    
    return matchesSearch && matchesDepartment && matchesLoanFilter;
  });

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setMemberDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setMemberDetailsOpen(false);
    setSelectedMember(null);
  };

  const handlePrintReport = () => {
    // Here you would implement print functionality
    window.print();
  };

  const handleExportPDF = () => {
    // Here you would implement PDF export functionality
    console.log('Exporting to PDF...');
    exportHtmlToPdf('activeLoansTable', 'Socios Activos.pdf');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <VisibilityIcon sx={{ fontSize: 32, color: '#0056b3' }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Ver Socios Activos
        </Typography>
      </Stack>

      <Card sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px', mb: 3 }}>
        <CardHeader 
          title="Filtros y Búsqueda" 
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Buscar por nombre, apellido o ID..."
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
                <InputLabel>Departamento</InputLabel>
                <Select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  label="Departamento"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showOnlyWithLoans}
                    onChange={(e) => setShowOnlyWithLoans(e.target.checked)}
                    color="primary"
                  />
                }
                label="Solo con préstamos activos"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<PrintIcon />}
                  onClick={handlePrintReport}
                  sx={{ color: '#0056b3', borderColor: '#0056b3' }}
                >
                  Imprimir
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleExportPDF}
                  sx={{ color: '#0056b3', borderColor: '#0056b3' }}
                >
                  PDF
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card id='activeLoansTable' sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title={`Socios Activos (${filteredMembers.length})`}
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Departamento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha Ingreso</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Salario</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Préstamos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Aportes</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.map((member, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {member.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {member.nombre} {member.apellido}
                      </Typography>
                    </TableCell>
                    <TableCell>{member.departamento}</TableCell>
                    <TableCell>{member.fechaIngreso}</TableCell>
                    <TableCell>{member.salario}</TableCell>
                    <TableCell>
                      <Chip 
                        label={member.prestamosActivos} 
                        size="small"
                        color={member.prestamosActivos > 0 ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {member.aportesAcumulados}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.estado} 
                        size="small"
                        color="success"
                        variant="filled"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewDetails(member)}
                        title="Ver detalles"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredMembers.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron socios
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {searchTerm || filterDepartment || showOnlyWithLoans 
                  ? 'Intenta con otros filtros de búsqueda' 
                  : 'No hay socios activos que mostrar'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalles del socio */}
      <Dialog open={memberDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          Detalles del Socio
        </DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {selectedMember.nombre} {selectedMember.apellido}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {selectedMember.id}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Información Personal
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Fecha de Nacimiento:</strong> {selectedMember.fechaNacimiento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estado Civil:</strong> {selectedMember.estadoCivil}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Dirección:</strong> {selectedMember.direccion}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Teléfono:</strong> {selectedMember.telefono}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedMember.email}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Información Laboral
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Departamento:</strong> {selectedMember.departamento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha de Ingreso:</strong> {selectedMember.fechaIngreso}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Salario:</strong> {selectedMember.salario}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Estado:</strong> 
                    <Chip 
                      label={selectedMember.estado} 
                      size="small"
                      color="success"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Información Financiera
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Aportes Acumulados:</strong> {selectedMember.aportesAcumulados}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Último Aporte:</strong> {selectedMember.ultimoAporte}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Préstamos Activos:</strong> 
                      <Chip 
                        label={selectedMember.prestamosActivos} 
                        size="small"
                        color={selectedMember.prestamosActivos > 0 ? 'warning' : 'default'}
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
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

export default ViewActiveMembersPage;
