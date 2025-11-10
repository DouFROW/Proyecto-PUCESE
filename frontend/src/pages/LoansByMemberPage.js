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
  Alert,
  Divider
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import TableChartIcon from '@mui/icons-material/TableChart';
import { exportHtmlToPdf } from '../components/pdfUtils';

const LoansByMemberPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDetailsOpen, setMemberDetailsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amortizationOpen, setAmortizationOpen] = useState(false);

  // Sample data - in a real app this would come from your backend
  const membersWithLoans = [
    {
      id: "#AET-0248",
      nombre: "Juan Pérez",
      departamento: "Administración",
      fechaIngreso: "15/03/2018",
      prestamosActivos: 1,
      prestamosHistoricos: 2,
      estado: "Activo",
      salario: "$1,200.00",
      email: "juan.perez@aetpuce.com",
      telefono: "0987654321",
      direccion: "Av. Principal 123, Quito",
      fechaNacimiento: "15/05/1985",
      estadoCivil: "Casado",
      aportesAcumulados: "$2,840.00",
      ultimoAporte: "15/08/2023",
      prestamos: [
        {
          id: "P-2023-0021",
          monto: "$5,000.00",
          tasa: "10.5%",
          plazo: "24 meses",
          cuota: "$350.50",
          saldo: "$4,200.00",
          estado: "Activo",
          fechaInicio: "15/08/2023",
          fechaVencimiento: "15/08/2025",
          cuotasPagadas: 1,
          cuotasRestantes: 23,
          proximoPago: "15/09/2023",
          montoProximoPago: "$350.50"
        },
        {
          id: "P-2022-0015",
          monto: "$2,500.00",
          tasa: "10.5%",
          plazo: "12 meses",
          cuota: "$285.75",
          saldo: "$0.00",
          estado: "Pagado",
          fechaInicio: "15/06/2022",
          fechaVencimiento: "15/06/2023",
          cuotasPagadas: 12,
          cuotasRestantes: 0,
          fechaPagoCompleto: "15/06/2023"
        },
        {
          id: "P-2021-0008",
          monto: "$3,000.00",
          tasa: "10.5%",
          plazo: "18 meses",
          cuota: "$305.20",
          saldo: "$0.00",
          estado: "Pagado",
          fechaInicio: "20/01/2021",
          fechaVencimiento: "20/07/2022",
          cuotasPagadas: 18,
          cuotasRestantes: 0,
          fechaPagoCompleto: "20/07/2022"
        }
      ]
    },
    {
      id: "#AET-0185",
      nombre: "María González",
      departamento: "Contabilidad",
      fechaIngreso: "20/06/2019",
      prestamosActivos: 1,
      prestamosHistoricos: 1,
      estado: "Activo",
      salario: "$1,350.00",
      email: "maria.gonzalez@aetpuce.com",
      telefono: "0987654322",
      direccion: "Calle Secundaria 456, Quito",
      fechaNacimiento: "22/08/1990",
      estadoCivil: "Soltera",
      aportesAcumulados: "$1,920.00",
      ultimoAporte: "20/08/2023",
      prestamos: [
        {
          id: "P-2023-0015",
          monto: "$3,000.00",
          tasa: "10.5%",
          plazo: "24 meses",
          cuota: "$350.50",
          saldo: "$2,800.50",
          estado: "Activo",
          fechaInicio: "15/03/2023",
          fechaVencimiento: "15/03/2025",
          cuotasPagadas: 6,
          cuotasRestantes: 18,
          proximoPago: "15/09/2023",
          montoProximoPago: "$350.50"
        },
        {
          id: "P-2022-0020",
          monto: "$1,800.00",
          tasa: "10.5%",
          plazo: "12 meses",
          cuota: "$257.15",
          saldo: "$0.00",
          estado: "Pagado",
          fechaInicio: "20/08/2022",
          fechaVencimiento: "20/08/2023",
          cuotasPagadas: 12,
          cuotasRestantes: 0,
          fechaPagoCompleto: "20/08/2023"
        }
      ]
    },
    {
      id: " 0801663832",
      nombre: "JENNY MERCEDES ANCHUNDIA ESPINOZA",
      departamento: "Recursos Humanos",
      fechaIngreso: "05/11/2017",
      prestamosActivos: 1,
      prestamosHistoricos: 0,
      estado: "Activo",
      salario: "$1,100.00",
      email: "ana.torres@aetpuce.com",
      telefono: "0987654324",
      direccion: "Calle Sur 321, Quito",
      fechaNacimiento: "05/03/1987",
      estadoCivil: "Divorciada",
      aportesAcumulados: "$3,120.00",
      ultimoAporte: "05/08/2023",
      prestamos: [
        {
          id: "P-2023-0018",
          monto: "$4,200.00",
          tasa: "10.5%",
          plazo: "24 meses",
          cuota: "$490.70",
          saldo: "$3,920.70",
          estado: "Activo",
          fechaInicio: "20/06/2023",
          fechaVencimiento: "20/06/2025",
          cuotasPagadas: 2,
          cuotasRestantes: 22,
          proximoPago: "20/09/2023",
          montoProximoPago: "$490.70"
        }
      ]
    }
  ];

  const filteredMembers = membersWithLoans.filter(member =>
    member.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMemberDetails = (member) => {
    setSelectedMember(member);
    setMemberDetailsOpen(true);
  };

  const handleCloseMemberDetails = () => {
    setMemberDetailsOpen(false);
    setSelectedMember(null);
  };

  const handleViewAmortization = (loan) => {
    setSelectedLoan(loan);
    setAmortizationOpen(true);
  };

  const handleCloseAmortization = () => {
    setAmortizationOpen(false);
    setSelectedLoan(null);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportPDF = () => {
    console.log('Exporting loans by member to PDF...');
    exportHtmlToPdf('activeLoansTable', 'Prestamo por socio.pdf');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'success';
      case 'Pagado': return 'info';
      case 'Cancelado': return 'error';
      default: return 'default';
    }
  };

  // Generate sample amortization table
  const generateAmortizationTable = (loan) => {
    const cuotas = parseInt(loan.plazo.split(' ')[0]);
    const monto = parseFloat(loan.monto.replace('$', '').replace(',', ''));
    const tasa = parseFloat(loan.tasa.replace('%', '')) / 100 / 12; // Monthly rate
    const cuotaMensual = parseFloat(loan.cuota.replace('$', '').replace(',', ''));
    
    const amortization = [];
    let saldoPendiente = monto;
    
    for (let i = 1; i <= cuotas; i++) {
      const interes = saldoPendiente * tasa;
      const capital = cuotaMensual - interes;
      saldoPendiente -= capital;
      
      amortization.push({
        cuota: i,
        fecha: new Date(2023, 8 + i, 15).toLocaleDateString('es-ES'),
        capital: `$${capital.toFixed(2)}`,
        interes: `$${interes.toFixed(2)}`,
        total: `$${cuotaMensual.toFixed(2)}`,
        saldo: `$${Math.max(0, saldoPendiente).toFixed(2)}`
      });
    }
    
    return amortization;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PersonIcon sx={{ fontSize: 32, color: '#0056b3' }} />
        <Typography variant="h4" fontWeight="bold" color="#0056b3">
          Préstamos por Socio
        </Typography>
      </Stack>

      <Card sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px', mb: 3 }}>
        <CardHeader 
          title="Buscar Socio" 
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                placeholder="Buscar por nombre, ID o departamento..."
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
            <Grid item xs={12} md={4}>
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

      <Card id='activeLoansTable' sx={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        <CardHeader 
          title={`Socios con Préstamos (${filteredMembers.length})`}
          sx={{ backgroundColor: '#0056b3', color: 'white' }}
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>ID Socio</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Departamento</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Préstamos Activos</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Préstamos Históricos</TableCell>
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
                        {member.nombre}
                      </Typography>
                    </TableCell>
                    <TableCell>{member.departamento}</TableCell>
                    <TableCell>
                      <Chip 
                        label={member.prestamosActivos} 
                        size="small"
                        color={member.prestamosActivos > 0 ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.prestamosHistoricos} 
                        size="small"
                        color="info"
                        variant="outlined"
                      />
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
                        onClick={() => handleViewMemberDetails(member)}
                        title="Ver detalles y préstamos"
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
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda' 
                  : 'No hay socios que mostrar'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de detalles del socio y sus préstamos */}
      <Dialog open={memberDetailsOpen} onClose={handleCloseMemberDetails} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          Detalles del Socio y Sus Préstamos
        </DialogTitle>
        <DialogContent>
          {selectedMember && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  {selectedMember.nombre}
                </Typography>
                <Typography variant="h6" color="primary" gutterBottom>
                  {selectedMember.id} - {selectedMember.departamento}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Información Personal
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Fecha de Ingreso:</strong> {selectedMember.fechaIngreso}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Salario:</strong> {selectedMember.salario}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Aportes Acumulados:</strong> {selectedMember.aportesAcumulados}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedMember.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Teléfono:</strong> {selectedMember.telefono}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Último Aporte:</strong> {selectedMember.ultimoAporte}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0056b3' }}>
                  Historial de Préstamos ({selectedMember.prestamos.length})
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>ID Préstamo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Plazo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Cuota</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Saldo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedMember.prestamos.map((prestamo, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {prestamo.id}
                            </Typography>
                          </TableCell>
                          <TableCell>{prestamo.monto}</TableCell>
                          <TableCell>{prestamo.plazo}</TableCell>
                          <TableCell>{prestamo.cuota}</TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {prestamo.saldo}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={prestamo.estado}
                              color={getStatusColor(prestamo.estado)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              color="primary"
                              onClick={() => handleViewAmortization(prestamo)}
                              title="Ver tabla de amortización"
                            >
                              <TableChartIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMemberDetails} startIcon={<CloseIcon />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de tabla de amortización */}
      <Dialog open={amortizationOpen} onClose={handleCloseAmortization} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TableChartIcon color="primary" />
          Tabla de Amortización
        </DialogTitle>
        <DialogContent>
          {selectedLoan && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedLoan.id} - {selectedMember?.nombre}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Monto: {selectedLoan.monto} | Plazo: {selectedLoan.plazo} | Cuota: {selectedLoan.cuota}
              </Typography>
              
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Cuota</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Capital</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Interés</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Saldo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {generateAmortizationTable(selectedLoan).slice(0, 12).map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.cuota}</TableCell>
                        <TableCell>{row.fecha}</TableCell>
                        <TableCell>{row.capital}</TableCell>
                        <TableCell>{row.interes}</TableCell>
                        <TableCell>{row.total}</TableCell>
                        <TableCell>{row.saldo}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body2" color="textSecondary">
                          ... (mostrando primeras 12 cuotas)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAmortization} startIcon={<CloseIcon />}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoansByMemberPage;
