import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Chip, 
  Badge,
  Box 
} from '@mui/material';

const PendingRequests = () => {
  const requests = [
    { title: 'Solicitud de Préstamo', subtitle: 'Carlos Mendoza - $2,500.00', date: 'Hoy', status: 'Pendiente de revisión' },
    { title: 'Actualización de Datos', subtitle: 'María González', date: 'Ayer', status: 'Esperando verificación' },
    { title: 'Nuevo Socio', subtitle: 'Roberto Pazmiño', date: 'Hace 2 días', status: 'Documentación pendiente' },
  ];

  return (
    <Card>
      <CardHeader
        title="Solicitudes Pendientes"
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <Badge badgeContent={3} color="error">
            <span>3</span>
          </Badge>
        }
      />
      <CardContent>
        <List>
          {requests.map((req, index) => (
            <ListItem key={index} component="button" divider={index < requests.length - 1}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Line ~23: Now Box is defined */}
                    <Typography variant="subtitle1">{req.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{req.date}</Typography>
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body1" color="text.primary">
                      {req.subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {req.status}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PendingRequests;