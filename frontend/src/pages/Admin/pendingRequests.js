import React from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const pendingRequests = [
  {
    title: "Solicitud de Préstamo",
    name: "Carlos Mendoza - $2,500.00",
    status: "Pendiente de revisión",
    date: "Hoy",
  },
  {
    title: "Actualización de Datos",
    name: "María González",
    status: "Esperando verificación",
    date: "Ayer",
  },
];

const PendingRequestsPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight="bold" color="#0056b3" mb={3}>
        Solicitudes Pendientes
      </Typography>

      <Card sx={{ maxWidth: 400 }}>
        <CardHeader
          title="Solicitudes Pendientes"
          sx={{
            backgroundColor: "#0056b3",
            color: "white",
            "& .MuiCardHeader-title": {
              fontSize: "1rem",
              fontWeight: "bold",
            },
          }}
          action={
            <IconButton size="small" sx={{ color: "white" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <CardContent sx={{ p: 0 }}>
          <List sx={{ p: 0 }}>
            {pendingRequests.map((request, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    py: 2,
                    px: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {request.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {request.date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mb: 0.5 }}
                  >
                    {request.name}
                  </Typography>
                  <Chip
                    label={request.status}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      height: "20px",
                      backgroundColor: "#e3f2fd",
                      color: "#1976d2",
                    }}
                  />
                </ListItem>
                {index < pendingRequests.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PendingRequestsPage;
