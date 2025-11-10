import React, { useState } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel,
  InputAdornment, Checkbox, FormControlLabel, Card, CardBody, CardTitle, Grid
} from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 600 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const LoanModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({ amount: '', term: 24, purpose: '', termsAccepted: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    alert('Solicitud enviada!');
    onClose();
  };

  const estimatedMonthly = 350.50; // Static for demo
  const totalPay = 5850.00; // Static for demo

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Solicitud de Préstamo</Typography>
          <Button onClick={onClose}><Close /></Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <TextField
                fullWidth
                label="Monto Solicitado"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
              />
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <FormControl fullWidth>
                <InputLabel>Plazo de Pago</InputLabel>
                <Select name="term" value={formData.term} onChange={handleChange} label="Plazo de Pago">
                  <MenuItem value={6}>6 meses</MenuItem>
                  <MenuItem value={12}>12 meses</MenuItem>
                  <MenuItem value={18}>18 meses</MenuItem>
                  <MenuItem value={24}>24 meses</MenuItem>
                  <MenuItem value={36}>36 meses</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Motivo del Préstamo"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Grid container spacing={3}>
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Resumen de Pago</Typography>
                <Typography>Cuota Mensual Estimada: <strong>${estimatedMonthly}</strong></Typography>
                <Typography>Tasa de Interés: <strong>10.5% anual</strong></Typography>
                <Typography>Monto Total a Pagar: <strong>${totalPay}</strong></Typography>
              </Card>
            </Grid>
            <Grid
              size={{
                xs: 12,
                md: 6
              }}>
              <FormControlLabel
                control={<Checkbox checked={formData.termsAccepted} onChange={handleChange} name="termsAccepted" />}
                label="Acepto los términos y condiciones"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={!formData.termsAccepted}>
                Enviar Solicitud
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default LoanModal;