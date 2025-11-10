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
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { exportHtmlToPdf } from '../components/pdfUtils';

const ViewCanceledLoansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDetailsOpen, setLoanDetailsOpen] = useState(false);
  const [filterReason, setFilterReason] = useState('');

  // Sample data - in a real app this would come from your backend
  const canceledLoans = [
    {
      id: "P-2023-0005",
      socio: "Pedro Ramírez",
      socioId: "#AET-0180",
      monto: "$2,000.00",
      tasa: "10.5%",
      plazo: "12 meses",
      cuota: "$285.75",
      fechaInicio: "15/01/2023",
      fechaCancelacion: "15/06/2023",
      motivoCancelacion: "Pago anticipado",
      cuotasPagadas: 5,
      cuotasRestantes: 7,
      montoCancelado: "$1,428.75",
      saldoCancelado: "$571.25",
      estado: "Cancelado"
    },
    {
      id: "P-2023-0008",
      socio: "Carmen Silva",
      socioId: "#AET-0192",
      monto: "$3,500.00",
      tasa: "10.5%",
      plazo: "18 meses",
      cuota: "$420.50",
      fechaInicio: "20/02/2023",
      fechaCancelacion: "20/07/2023",
      motivoCancelacion: "Incumplimiento de pagos",
      cuotasPagadas: 4,
      cuotasRestantes: 14,
      montoCancelado: "$1,682.00",
      saldoCancelado: "$1,818.00",
      estado: "Cancelado"
    },
    {
      id: "P-2023-0012",
      socio: "Fernando Castro",
      socioId: "#AET-0205",
      monto: "$1,800.00",
      tasa: "10.5%",
      plazo: "12 meses",
      cuota: "$257.15",
      fechaInicio: "10/03/2023",
      fechaCancelacion: "10/08/2023",
      motivoCancelacion: "Solicitud del socio",
      cuotasPagadas: 5,
      cuotasRestantes: 7,
      montoCancelado: "$1,285.75",
      saldoCancelado: "$514.25",
      estado: "Cancelado"
    },
    {
      id: "P-2023-0014",
      socio: "Rosa Méndez",
      socioId: "#AET-0218",
      monto: "$4,000.00",
      tasa: "10.5%",
      plazo: "24 meses",
      cuota: "$350.50",
      fechaInicio: "05/04/2023",
      fechaCancelacion: "05/09/2023",
      motivoCancelacion: "Pago anticipado",
      cuotasPagadas: 5,
      cuotasRestantes: 19,
      montoCancelado: "$1,752.50",
      saldoCancelado: "$2,247.50",
      estado: "Cancelado"
    }
  ];

  const cancelReasons = ['Pago anticipado', 'Incumplimiento de pagos', 'Solicitud del socio', 'Problemas financieros'];

  const filteredLoans = canceledLoans.filter(loan => {
    const matchesSearch = loan.socio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.socioId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesReason = !filterReason || loan.motivoCancelacion === filterReason;
    
    return matchesSearch && matchesReason;
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
     exportHtmlToPdf('activeLoansTable', 'Prestamos cancelados.pdf');
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'Pago anticipado': return 'success';
      case 'Incumplimiento de pagos': return 'error';
      case 'Solicitud del socio': return 'warning';
      case 'Problemas financieros': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <CancelIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
        <Typography variant="h4" fontWeight="bold" color="#d32f2f">
          Ver Préstamos Cancelados
        </Typography>
      </Stack>

      <Card sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px', mb: 3 }}>
        <CardHeader 
          title="Filtros y Búsqueda" 
          sx={{ backgroundColor: '#d32f2f', color: 'white' }}
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
                <InputLabel>Motivo de Cancelación</InputLabel>
                <Select
                  value={filterReason}
                  onChange={(e) => setFilterReason(e.target.value)}
                  label="Motivo de Cancelación"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {cancelReasons.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
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
                  sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                >
                  Imprimir
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={handleExportPDF}
                  sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                >
                  Exportar PDF
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card id='activeLoansTable' sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title={`Préstamos Cancelados (${filteredLoans.length})`}
          sx={{ backgroundColor: '#d32f2f', color: 'white' }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID Préstamo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Socio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cuota</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha Inicio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha Cancelación</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Motivo</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Cuotas Pagadas</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Saldo Cancelado</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLoans.map((loan, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {loan.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {loan.socio}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {loan.socioId}
                      </Typography>
                    </TableCell>
                    <TableCell>{loan.monto}</TableCell>
                    <TableCell>{loan.cuota}</TableCell>
                    <TableCell>{loan.fechaInicio}</TableCell>
                    <TableCell>{loan.fechaCancelacion}</TableCell>
                    <TableCell>
                      <Chip
                        label={loan.motivoCancelacion}
                        color={getReasonColor(loan.motivoCancelacion)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {loan.cuotasPagadas}/{loan.cuotasPagadas + loan.cuotasRestantes}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium" color="error">
                        {loan.saldoCancelado}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => handleViewDetails(loan)}
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

          {filteredLoans.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron préstamos cancelados
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {searchTerm || filterReason 
                  ? 'Intenta con otros filtros de búsqueda' 
                  : 'No hay préstamos cancelados que mostrar'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalles del préstamo cancelado */}
      <Dialog open={loanDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CancelIcon color="error" />
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
                <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f' }}>
                  Información del Préstamo
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Monto Original:</strong> {selectedLoan.monto}
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
                  <Typography variant="body2">
                    <strong>Estado:</strong> 
                    <Chip 
                      label={selectedLoan.estado} 
                      color="error"
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f' }}>
                  Cronograma de Cancelación
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Fecha de Inicio:</strong> {selectedLoan.fechaInicio}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha de Cancelación:</strong> {selectedLoan.fechaCancelacion}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cuotas Pagadas:</strong> {selectedLoan.cuotasPagadas}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cuotas Restantes:</strong> {selectedLoan.cuotasRestantes}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Motivo de Cancelación:</strong> 
                    <Chip 
                      label={selectedLoan.motivoCancelacion} 
                      color={getReasonColor(selectedLoan.motivoCancelacion)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f' }}>
                  Resumen Financiero
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Monto Cancelado:</strong> {selectedLoan.montoCancelado}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Saldo Cancelado:</strong> 
                      <Typography component="span" color="error" fontWeight="bold">
                        {selectedLoan.saldoCancelado}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Porcentaje Pagado:</strong> 
                      {Math.round((selectedLoan.cuotasPagadas / (selectedLoan.cuotasPagadas + selectedLoan.cuotasRestantes)) * 100)}%
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              {selectedLoan.motivoCancelacion === 'Incumplimiento de pagos' && (
                <Grid item xs={12}>
                  <Box sx={{ 
                    backgroundColor: '#ffebee', 
                    border: '1px solid #f44336', 
                    borderRadius: 1, 
                    p: 2 
                  }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <WarningIcon color="error" />
                      <Typography variant="body2" color="error" fontWeight="bold">
                        Préstamo cancelado por incumplimiento de pagos
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                      Este préstamo fue cancelado debido al incumplimiento en los pagos. 
                      El socio mantiene la obligación de pagar el saldo pendiente.
                    </Typography>
                  </Box>
                </Grid>
              )}
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
