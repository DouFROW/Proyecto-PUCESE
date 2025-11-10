import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  PersonRemove as PersonRemoveIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';

const DeactivateMemberPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deactivatedMemberName, setDeactivatedMemberName] = useState('');
  const [actionType, setActionType] = useState('');

  const [members, setMembers] = useState([
    {
      id: '#AET-0248',
      nombre: 'Juan Pérez',
      departamento: 'Administración',
      fechaIngreso: '15/03/2018',
      prestamosActivos: 1,
      estado: 'Activo',
      salario: '$1,200.00',
      fechaActivacion: '15/03/2018',
      fechaDesactivacion: null,
    },
    {
      id: '#AET-0185',
      nombre: 'María González',
      departamento: 'Contabilidad',
      fechaIngreso: '20/06/2019',
      prestamosActivos: 0,
      estado: 'Activo',
      salario: '$1,350.00',
      fechaActivacion: '20/06/2019',
      fechaDesactivacion: null,
    },
    {
      id: '#AET-0154',
      nombre: 'Luis Vásquez',
      departamento: 'Mantenimiento',
      fechaIngreso: '15/08/2015',
      prestamosActivos: 0,
      estado: 'Inactivo',
      salario: '$950.00',
      fechaActivacion: null,
      fechaDesactivacion: '10/09/2022',
    },
  ]);

  const filteredMembers = members.filter(
    (m) =>
      m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeactivateClick = (member) => {
    setSelectedMember(member);
    setActionType(member.estado === 'Inactivo' ? 'activar' : 'desactivar');
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeactivation = () => {
    const isActivating = selectedMember.estado === 'Inactivo';
    const fechaActual = new Date().toLocaleDateString('es-ES');

    setMembers((prev) =>
      prev.map((m) =>
        m.id === selectedMember.id
          ? {
              ...m,
              estado: isActivating ? 'Activo' : 'Inactivo',
              fechaActivacion: isActivating ? fechaActual : m.fechaActivacion,
              fechaDesactivacion: !isActivating ? fechaActual : null,
            }
          : m
      )
    );

    setDeactivatedMemberName(selectedMember.nombre);
    setSuccess(true);
    setConfirmDialogOpen(false);
    setSelectedMember(null);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancelDeactivation = () => {
    setConfirmDialogOpen(false);
    setSelectedMember(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <PersonRemoveIcon sx={{ fontSize: 32, color: '#d32f2f' }} />
        <Typography variant="h4" fontWeight="bold" color="#d32f2f">
          Gestionar Estado de Socios
        </Typography>
      </Stack>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {actionType === 'activar'
            ? `¡Socio activado exitosamente! ${deactivatedMemberName} ha sido reactivado.`
            : `¡Socio desactivado exitosamente! ${deactivatedMemberName} ha sido desactivado.`}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardHeader title="Buscar Socio" sx={{ backgroundColor: '#d32f2f', color: 'white' }} />
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Lista de Socios" sx={{ backgroundColor: '#d32f2f', color: 'white' }} />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Departamento</TableCell>
                  <TableCell>Fecha Ingreso</TableCell>
                  <TableCell>Fecha Activ./Desact.</TableCell>
                  <TableCell>Salario</TableCell>
                  <TableCell>Préstamos Activos</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMembers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.id}</TableCell>
                    <TableCell>{m.nombre}</TableCell>
                    <TableCell>{m.departamento}</TableCell>
                    <TableCell>{m.fechaIngreso}</TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        <strong>Activación:</strong> {m.fechaActivacion || '—'}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Desactivación:</strong> {m.fechaDesactivacion || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>{m.salario}</TableCell>
                    <TableCell>
                      <Chip
                        label={m.prestamosActivos}
                        color={m.prestamosActivos > 0 ? 'warning' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={m.estado}
                        color={m.estado === 'Activo' ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={m.estado === 'Inactivo' ? 'success' : 'error'}
                        size="small"
                        onClick={() => handleDeactivateClick(m)}
                        disabled={m.prestamosActivos > 0}
                      >
                        {m.estado === 'Inactivo' ? 'Activar' : 'Desactivar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={confirmDialogOpen} onClose={handleCancelDeactivation} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="warning" />
          {selectedMember?.estado === 'Inactivo'
            ? 'Confirmar Activación de Socio'
            : 'Confirmar Desactivación de Socio'}
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿Está seguro de que desea {actionType} al siguiente socio?
          </Typography>

          {selectedMember && (
            <Box
              sx={{
                backgroundColor: '#f5f5f5',
                p: 2,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedMember.nombre}
              </Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {selectedMember.id}
              </Typography>
              <Typography variant="body2">
                <strong>Departamento:</strong> {selectedMember.departamento}
              </Typography>
              <Typography variant="body2">
                <strong>Fecha Ingreso:</strong> {selectedMember.fechaIngreso}
              </Typography>
              <Typography variant="body2">
                <strong>Préstamos Activos:</strong> {selectedMember.prestamosActivos}
              </Typography>
            </Box>
          )}

          <Alert
            severity="warning"
            sx={{ backgroundColor: '#fff8e1', borderRadius: 2, fontSize: '0.9rem' }}
          >
            <strong>Importante:</strong> Esta acción {actionType === 'activar' ? 'activará' : 'desactivará'} el socio
            pero <strong>NO eliminará sus datos</strong>. El socio podrá ser
            {actionType === 'activar' ? ' desactivado ' : ' reactivado '} en el futuro si es necesario.
          </Alert>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDeactivation} startIcon={<CloseIcon />}>
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDeactivation}
            variant="contained"
            color={selectedMember?.estado === 'Inactivo' ? 'success' : 'error'}
            startIcon={<CheckIcon />}
          >
            {selectedMember?.estado === 'Inactivo'
              ? 'Confirmar Activación'
              : 'Confirmar Desactivación'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeactivateMemberPage;