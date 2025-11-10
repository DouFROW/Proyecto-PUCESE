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
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Save as SaveIcon,
  Backup as BackupIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudDownload as DownloadIcon
} from '@mui/icons-material';

const SystemConfiguration = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [systemParams, setSystemParams] = useState({
    interestRate: '10,5',
    maxLoanAmount: '10000',
    minTerm: '6',
    maxTerm: '36'
  });

  const [backupChecked, setBackupChecked] = useState(false);
  const [recentBackups] = useState([
    'respaldo_20230815.sql',
    'respaldo_20230801.sql',
    'respaldo_20230715.sql'
  ]);

  const [users] = useState([
    {
      usuario: 'admin',
      rol: 'Administrador',
      estado: 'Activo'
    },
    {
      usuario: 'contabilidad',
      rol: 'Contador',
      estado: 'Activo'
    },
    {
      usuario: 'consultas',
      rol: 'Consulta',
      estado: 'Inactivo'
    }
  ]);

  const handleParamChange = (field, value) => {
    setSystemParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveConfig = () => {
    console.log('Saving configuration:', systemParams);
    alert('Configuración guardada exitosamente');
  };

  const MobileUserCard = ({ user }) => (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {user.usuario}
              </Typography>
              <Chip 
                label={user.estado} 
                size="small"
                color={user.estado === 'Activo' ? 'success' : 'default'}
                variant="outlined"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary">Rol</Typography>
            <Typography variant="body2">{user.rol}</Typography>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <IconButton size="small" color="primary">
                <EditIcon />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      {/* Header */}
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
        Configuración del Sistema
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Parámetros del Sistema
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Tasa de Interés Anual
                </Typography>
                <TextField
                  fullWidth
                  value={systemParams.interestRate}
                  onChange={(e) => handleParamChange('interestRate', e.target.value)}
                  InputProps={{
                    endAdornment: <Typography color="textSecondary">%</Typography>,
                  }}
                  size="small"
                  placeholder="10,5"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Monto Máximo de Préstamo
                </Typography>
                <TextField
                  fullWidth
                  value={systemParams.maxLoanAmount}
                  onChange={(e) => handleParamChange('maxLoanAmount', e.target.value)}
                  InputProps={{
                    startAdornment: <Typography color="textSecondary">$</Typography>,
                  }}
                  size="small"
                  placeholder="10000"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Plazo Mínimo (meses)
                </Typography>
                <TextField
                  fullWidth
                  value={systemParams.minTerm}
                  onChange={(e) => handleParamChange('minTerm', e.target.value)}
                  size="small"
                  placeholder="6"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                  Plazo Máximo (meses)
                </Typography>
                <TextField
                  fullWidth
                  value={systemParams.maxTerm}
                  onChange={(e) => handleParamChange('maxTerm', e.target.value)}
                  size="small"
                  placeholder="36"
                />
              </Grid>


              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveConfig}
                  sx={{ mt: 2 }}
                  size="large"
                >
                  Guardar Configuración
                </Button>
              </Grid>
            </Grid>
          </Paper>


          <Paper sx={{ p: 3 }}>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Respaldos del Sistema
            </Typography>


            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                Respaldar Base de Datos
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                Realice un respaldo completo de la base de datos del sistema
              </Typography>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={backupChecked}
                    onChange={(e) => setBackupChecked(e.target.checked)}
                    icon={<BackupIcon />}
                    checkedIcon={<BackupIcon />}
                  />
                }
                label="Generar Respaldo"
              />
            </Box>


            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                Respaldos Recientes
              </Typography>
              <List dense>
                {recentBackups.map((backup, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" size="small">
                        <DownloadIcon />
                      </IconButton>
                    }
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                  >
                    <ListItemIcon>
                      <BackupIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={backup} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>


        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ fontWeight: 'bold' }}
              >
                Usuarios del Sistema
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                size="small"
              >
                Agregar Usuario
              </Button>
            </Box>

            {isMobile ? (

              <Box>
                {users.map((user, index) => (
                  <MobileUserCard key={index} user={user} />
                ))}
              </Box>
            ) : (

              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="usuarios del sistema">
                  <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Usuario</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Rol</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Estado</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={index}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:hover': { backgroundColor: theme.palette.action.hover }
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" fontWeight="bold">
                            {user.usuario}
                          </Typography>
                        </TableCell>
                        <TableCell>{user.rol}</TableCell>
                        <TableCell>
                          <Chip 
                            label={user.estado} 
                            size="small"
                            color={user.estado === 'Activo' ? 'success' : 'default'}
                            variant={user.estado === 'Activo' ? 'filled' : 'outlined'}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
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
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              color="error"
                              sx={{ 
                                backgroundColor: theme.palette.action.hover,
                                '&:hover': {
                                  backgroundColor: theme.palette.error.light,
                                  color: 'white'
                                }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}


            <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="caption" color="textSecondary">
                Uruguay 2023 • 13/07/2023
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemConfiguration;