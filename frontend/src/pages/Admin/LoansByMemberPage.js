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
  Divider
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import TableChartIcon from '@mui/icons-material/TableChart';
import { exportHtmlToPdf } from '../../components/pdfUtils';

const LoansByMemberPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDetailsOpen, setMemberDetailsOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amortizationOpen, setAmortizationOpen] = useState(false);

  // Lista vacía
  const membersWithLoans = [];

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
                    <TableCell>{member.nombre}</TableCell>
                    <TableCell>{member.departamento}</TableCell>
                    <TableCell>
                      <Chip 
                        label={member.prestamosActivos}
                        size="small"
                        color={member.prestamosActivos > 0 ? 'warning' : 'default'}
                        variant="outlined"
                        sx={{
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          px: 1.5
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.prestamosHistoricos}
                        size="small"
                        color="info"
                        variant="outlined"
                        sx={{
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          px: 1.5
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={member.estado}
                        size="small"
                        color={getStatusColor(member.estado)}
                        variant="filled"
                        sx={{
                          borderRadius: "6px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          px: 1.5
                        }}
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
    </Box>
  );
};

export default LoansByMemberPage;
