import React from 'react';
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
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Chip,
  Divider
} from '@mui/material';

const AccountingManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const accountingData = [
    {
      fecha: '15/08/2023',
      descripcion: 'Pago de cuota - María González',
      categoria: 'Préstamos',
      ingresos: '$350.50',
      egresos: '',
      saldo: '$25,420.75'
    },
    {
      fecha: '14/08/2023',
      descripcion: 'Pago de servicios (agua, luz)',
      categoria: 'Servicios',
      ingresos: '',
      egresos: '$420.30',
      saldo: '$25,070.25'
    },
    {
      fecha: '12/08/2023',
      descripcion: 'Pago de cuota - Luis Vásquez',
      categoria: 'Préstamos',
      ingresos: '$285.75',
      egresos: '',
      saldo: '$25,490.55'
    },
    {
      fecha: '10/08/2023',
      descripcion: 'Compra de material de oficina',
      categoria: 'Suministros',
      ingresos: '',
      egresos: '$150.80',
      saldo: '$25,204.80'
    },
    {
      fecha: '05/08/2023',
      descripcion: 'Pago de cuota - Ana Torres',
      categoria: 'Préstamos',
      ingresos: '$490.70',
      egresos: '',
      saldo: '$25,355.60'
    }
  ];

  const financialSummary = {
    ingresos: '$4,256.95',
    egresos: '$2,840.60',
    total: '$1,416.35'
  };

  const distribucionIngresos = ['Préstamos', 'Aportes Otros', 'Inversiones'];
  const distribucionEgresos = ['Nómina', 'Servicios', 'Suministros', 'Mantenimiento', 'Otros'];

  const MobileRow = ({ row }) => (
    <Paper sx={{ p: 2, mb: 2, backgroundColor: theme.palette.background.default }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">Fecha</Typography>
          <Typography variant="body2">{row.fecha}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle2" color="textSecondary">Categoría</Typography>
          <Chip label={row.categoria} size="small" color="primary" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">Descripción</Typography>
          <Typography variant="body2">{row.descripcion}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">Ingresos</Typography>
          <Typography variant="body2" color="success.main">{row.ingresos}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">Egresos</Typography>
          <Typography variant="body2" color="error.main">{row.egresos}</Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle2" color="textSecondary">Saldo</Typography>
          <Typography variant="body2" fontWeight="bold">{row.saldo}</Typography>
        </Grid>
      </Grid>
    </Paper>
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
        Gestión Contable
      </Typography>


      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Registro Contable
      </Typography>

      {isMobile ? (
        <Box>
          {accountingData.map((row, index) => (
            <MobileRow key={index} row={row} />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="registro contable">
            <TableHead sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Categoría</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Ingresos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Egresos</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountingData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{row.descripcion}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.categoria} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'success.main', fontWeight: 'bold' }}>
                    {row.ingresos}
                  </TableCell>
                  <TableCell sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    {row.egresos}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>{row.saldo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Divider sx={{ my: 4 }} />

      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 3
        }}
      >
        Resumen Financiero
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Balance del Mes
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Ingresos:</Typography>
                  <Typography variant="body1" color="success.main" fontWeight="bold">
                    {financialSummary.ingresos}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">Egresos:</Typography>
                  <Typography variant="body1" color="error.main" fontWeight="bold">
                    {financialSummary.egresos}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">Total:</Typography>
                  <Typography variant="h6" color="primary.main" fontWeight="bold">
                    {financialSummary.total}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Distribución de Ingresos
              </Typography>
              <Box sx={{ mt: 1 }}>
                {distribucionIngresos.map((item, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1,
                      p: 1,
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.success.main,
                        mr: 2
                      }}
                    />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Distribución de Egresos
              </Typography>
              <Box sx={{ mt: 1 }}>
                {distribucionEgresos.map((item, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 1,
                      p: 1,
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.error.main,
                        mr: 2
                      }}
                    />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountingManagement;