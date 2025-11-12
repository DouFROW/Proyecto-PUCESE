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
  MenuItem
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import { exportHtmlToPdf } from '../../components/pdfUtils';

const ViewCanceledLoansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDetailsOpen, setLoanDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  // Lista vacía para conectar al backend
  const canceledLoans = [];

  const statusOptions = ['Cancelado'];

  const filteredLoans = canceledLoans.filter(loan => {
    const matchesSearch = loan.socio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.socioId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || loan.estado === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setLoanDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setLoanDetailsOpen(false);
    setSelectedLoan(null);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log('Exporting canceled loans to PDF...');
    exportHtmlToPdf('canceledLoansTable', 'PrestamosCancelados.pdf');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Cancelado': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <AssignmentIcon sx={{ fontSize: 32, color: '#0056b3' }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Ver Préstamos Cancelados
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
                placeholder="Buscar por socio, ID de préstamo..."
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
                  Exportar PDF
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card id="canceledLoansTable" sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title={`Préstamos Cancelados (${filteredLoans.length})`}
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID Préstamo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Socio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Tasa</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Plazo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cuota</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Saldo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha Cancelación</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLoans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography variant="h6" color="textSecondary">
                        No se encontraron préstamos cancelados
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {searchTerm || filterStatus 
                          ? 'Intenta con otros filtros de búsqueda' 
                          : 'No hay préstamos cancelados que mostrar'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLoans.map((loan, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{loan.id}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {loan.socio}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {loan.socioId}
                        </Typography>
                      </TableCell>
                      <TableCell>{loan.monto}</TableCell>
                      <TableCell>{loan.tasa}</TableCell>
                      <TableCell>{loan.plazo}</TableCell>
                      <TableCell>{loan.cuota}</TableCell>
                      <TableCell>{loan.saldo}</TableCell>
                      <TableCell>
                        <Chip
                          label={loan.estado}
                          color={getStatusColor(loan.estado)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{loan.fechaCancelacion}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            color="primary"
                            onClick={() => handleViewDetails(loan)}
                            title="Ver detalles"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog de detalles del préstamo */}
      <Dialog open={loanDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon color="primary" />
          Detalles del Préstamo Cancelado
        </DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {selectedLoan.id}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  Socio: {selectedLoan.socio} ({selectedLoan.socioId})
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Información del Préstamo
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Monto:</strong> {selectedLoan.monto}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tasa de Interés:</strong> {selectedLoan.tasa}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Plazo:</strong> {selectedLoan.plazo}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cuota Mensual:</strong> {selectedLoan.cuota}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Detalle de Cancelación
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Fecha de Cancelación:</strong> {selectedLoan.fechaCancelacion}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Motivo:</strong> {selectedLoan.motivo || 'N/A'}
                  </Typography>
                </Stack>
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

export default ViewCanceledLoansPage;
