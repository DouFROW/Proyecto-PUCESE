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
import { exportHtmlToPdf } from '../components/pdfUtils';



const ViewActiveLoansPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loanDetailsOpen, setLoanDetailsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');

  // Sample data - in a real app this would come from your backend
  const activeLoans = [
    {
      id: "P-2023-0015",
      socio: "María González",
      socioId: "#AET-0185",
      monto: "$3,000.00",
      tasa: "10.5%",
      plazo: "24 meses",
      cuota: "$350.50",
      saldo: "$2,800.50",
      estado: "Al día",
      fechaInicio: "15/03/2023",
      fechaVencimiento: "15/03/2025",
      cuotasPagadas: 6,
      cuotasRestantes: 18,
      proximoPago: "15/09/2023",
      montoProximoPago: "$350.50"
    },
    {
      id: "P-2023-0018",
      socio: "Ana Torres",
      socioId: "#AET-0198",
      monto: "$4,200.00",
      tasa: "10.5%",
      plazo: "24 meses",
      cuota: "$490.70",
      saldo: "$3,920.70",
      estado: "Al día",
      fechaInicio: "20/06/2023",
      fechaVencimiento: "20/06/2025",
      cuotasPagadas: 2,
      cuotasRestantes: 22,
      proximoPago: "20/09/2023",
      montoProximoPago: "$490.70"
    },
    {
      id: "P-2023-0009",
      socio: "Luis Vásquez",
      socioId: "#AET-0154",
      monto: "$2,500.00",
      tasa: "10.5%",
      plazo: "18 meses",
      cuota: "$285.75",
      saldo: "$1,200.25",
      estado: "Pendiente",
      fechaInicio: "10/01/2023",
      fechaVencimiento: "10/07/2024",
      cuotasPagadas: 8,
      cuotasRestantes: 10,
      proximoPago: "10/09/2023",
      montoProximoPago: "$285.75"
    },
    {
      id: "P-2023-0021",
      socio: "Juan Pérez",
      socioId: "#AET-0248",
      monto: "$5,000.00",
      tasa: "10.5%",
      plazo: "24 meses",
      cuota: "$350.50",
      saldo: "$4,200.00",
      estado: "Al día",
      fechaInicio: "15/08/2023",
      fechaVencimiento: "15/08/2025",
      cuotasPagadas: 1,
      cuotasRestantes: 23,
      proximoPago: "15/09/2023",
      montoProximoPago: "$350.50"
    }
  ];

  const statusOptions = ['Al día', 'Pendiente', 'Moroso'];

  const filteredLoans = activeLoans.filter(loan => {
    const matchesSearch = loan.socio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.socioId.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    console.log('Exporting active loans to PDF...');
    exportHtmlToPdf('activeLoansTable', 'PrestamosActivos.pdf');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Al día': return 'success';
      case 'Pendiente': return 'warning';
      case 'Moroso': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <AssignmentIcon sx={{ fontSize: 32, color: '#0056b3' }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Ver Préstamos Activos
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

      <Card id="activeLoansTable" sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title={`Préstamos Activos (${filteredLoans.length})`}
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
                  <TableCell sx={{ fontWeight: 'bold' }}>Próximo Pago</TableCell>
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
                    <TableCell>{loan.tasa}</TableCell>
                    <TableCell>{loan.plazo}</TableCell>
                    <TableCell>{loan.cuota}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {loan.saldo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={loan.estado}
                        color={getStatusColor(loan.estado)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {loan.proximoPago}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {loan.montoProximoPago}
                      </Typography>
                    </TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredLoans.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No se encontraron préstamos activos
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {searchTerm || filterStatus 
                  ? 'Intenta con otros filtros de búsqueda' 
                  : 'No hay préstamos activos que mostrar'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalles del préstamo */}
      <Dialog open={loanDetailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssignmentIcon color="primary" />
          Detalles del Préstamo
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
                  <Typography variant="body2">
                    <strong>Saldo Pendiente:</strong> {selectedLoan.saldo}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Cronograma
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Fecha de Inicio:</strong> {selectedLoan.fechaInicio}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Fecha de Vencimiento:</strong> {selectedLoan.fechaVencimiento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cuotas Pagadas:</strong> {selectedLoan.cuotasPagadas}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cuotas Restantes:</strong> {selectedLoan.cuotasRestantes}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Próximo Pago:</strong> {selectedLoan.proximoPago}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Estado Actual
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={selectedLoan.estado}
                    color={getStatusColor(selectedLoan.estado)}
                    size="medium"
                  />
                  <Typography variant="body2">
                    Próximo pago: {selectedLoan.montoProximoPago}
                  </Typography>
                </Box>
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

export default ViewActiveLoansPage;
