import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  InputAdornment,
  Switch,
  FormGroup
} from '@mui/material';
import {
  Search as SearchIcon,
  Chat as ChatIcon
} from '@mui/icons-material';

const PartnersManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  // Sample data
  const partnersData = [
    {
      id: '#AET-0248',
      nombre: 'Juan Pérez',
      departamento: 'Administración',
      fechaIngreso: '15/03/2018',
      prestamosActivos: 1,
      estado: 'Activo'
    },
    {
      id: '#AET-0185',
      nombre: 'María González',
      departamento: 'Contabilidad',
      fechaIngreso: '20/06/2019',
      prestamosActivos: 1,
      estado: 'Activo'
    },
    {
      id: '#AET-0212',
      nombre: 'Carlos Mendoza',
      departamento: 'Sistemas',
      fechaIngreso: '10/01/2020',
      prestamosActivos: 0,
      estado: 'Activo'
    },
    {
      id: '#AET-0198',
      nombre: 'Ana Torres',
      departamento: 'Recursos Humanos',
      fechaIngreso: '05/11/2017',
      prestamosActivos: 1,
      estado: 'Activo'
    },
    {
      id: '#AET-0154',
      nombre: 'Luis Vásquez',
      departamento: 'Mantenimiento',
      fechaIngreso: '15/08/2015',
      prestamosActivos: 1,
      estado: 'Inactivo'
    }
  ];

  const filteredPartners = partnersData.filter(partner => {
    const matchesSearch = partner.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActiveFilter = showInactive ? true : partner.estado === 'Activo';
    return matchesSearch && matchesActiveFilter;
  });

  const MobilePartnerCard = ({ partner }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {partner.nombre}
              </Typography>
              <Chip 
                label={partner.estado} 
                size="small"
                color={partner.estado === 'Activo' ? 'success' : 'default'}
                variant="outlined"
              />
            </Box>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">ID</Typography>
            <Typography variant="body2">{partner.id}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">Departamento</Typography>
            <Typography variant="body2">{partner.departamento}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">Fecha Ingreso</Typography>
            <Typography variant="body2">{partner.fechaIngreso}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="caption" color="textSecondary">Préstamos Activos</Typography>
            <Typography 
              variant="body2" 
              fontWeight="bold"
              color={partner.prestamosActivos > 0 ? 'primary' : 'textSecondary'}
            >
              {partner.prestamosActivos}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton size="small" color="primary">
                <ChatIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 4
        }}
      >
        Gestión de Socios
      </Typography>


      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Listado de Socios
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar socio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    color="primary"
                  />
                }
                label="Mostrar socios inactivos"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Paper>

      {isMobile ? (
        <Box>
          {filteredPartners.map((partner, index) => (
            <MobilePartnerCard key={index} partner={partner} />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="listado de socios">
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Departamento</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha Ingreso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Préstamos Activos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPartners.map((partner, index) => (
                <TableRow
                  key={index}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="bold">
                      {partner.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {partner.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>{partner.departamento}</TableCell>
                  <TableCell>{partner.fechaIngreso}</TableCell>
                  <TableCell>
                    <Chip 
                      label={partner.prestamosActivos} 
                      size="small"
                      color={partner.prestamosActivos > 0 ? 'primary' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={partner.estado} 
                      size="small"
                      color={partner.estado === 'Activo' ? 'success' : 'default'}
                      variant={partner.estado === 'Activo' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      size="small" 
                      color="primary"
                      sx={{ 
                        backgroundColor: theme.palette.action.hover,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.light,
                          color: 'white'
                        }
                      }}
                    >
                      <ChatIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}


      {filteredPartners.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
          <Typography variant="h6" color="textSecondary">
            No se encontraron socios
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay socios que mostrar'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default PartnersManagement;