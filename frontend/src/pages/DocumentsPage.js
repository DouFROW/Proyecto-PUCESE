import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const categories = [
  {
    title: "Estatutos y Normativas",
    documents: [
      {
        title: "Estatutos de la AETPUCE - 2023",
        desc: "Actualización aprobada en Asamblea General del 15 de marzo de 2023",
        file: "/Documents/estatutos-2023.pdf",
      },
      {
        title: "Reglamento Interno",
        desc: "Reglamento interno de funcionamiento de la asociación",
        file: "/Documents/reglamento-interno.pdf",
      },
    ],
  },
  {
    title: "Normativas de Préstamos",
    documents: [
      {
        title: "Política de Préstamos 2023",
        desc: "Normativa actualizada para solicitud y aprobación de préstamos",
        file: "/Documents/politica-prestamos-2023.pdf",
      },
    ],
  },
  {
    title: "Actas de Asamblea",
    documents: [
      {
        title: "Acta de Asamblea General Ordinaria - 2023",
        desc: "Acta de la asamblea celebrada el 15 de marzo de 2023",
        file: "/Documents/acta-general-2023.pdf",
      },
      {
        title: "Acta de Asamblea Extraordinaria - Junio 2023",
        desc: "Acta de la asamblea extraordinaria celebrada el 20 de junio de 2023",
        file: "/Documents/acta-extraordinaria-junio-2023.pdf",
      },
    ],
  },
  {
    title: "Formatos y Solicitudes",
    documents: [
      {
        title: "Formulario de Solicitud de Préstamo",
        desc: "Formato oficial para solicitud de préstamos",
        file: "/Documents/formulario-solicitud-prestamo.pdf",
      },
    ],
  },
];

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Función para ver el archivo en una nueva pestaña
  const handleView = (filePath) => {
    window.open(filePath, "_blank");
  };

  // Función para descargar el archivo
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName || filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrar documentos por búsqueda
  const filteredCategories = categories.map(cat => ({
    ...cat,
    documents: cat.documents.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.desc.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.documents.length > 0);

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold" color="#0056b3">
          Documentos Institucionales
        </Typography>
        <TextField 
          size="small" 
          label="Buscar documentos..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 300 }}
        />
      </Stack>

      <Card>
        <CardHeader
          title="Documentos de la AETPUCE"
          sx={{ backgroundColor: "#0056b3", color: "white" }}
        />
        <CardContent>
          {filteredCategories.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={3}>
              No se encontraron documentos que coincidan con tu búsqueda
            </Typography>
          ) : (
            filteredCategories.map((cat, i) => (
              <Box key={i} mb={3}>
                <Typography variant="subtitle1" color="#0056b3" fontWeight="bold" mb={1}>
                  {cat.title}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {cat.documents.map((doc, j) => (
                  <Box
                    key={j}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    py={1.5}
                    px={1}
                    sx={{
                      "&:hover": { backgroundColor: "#f8f9fa" },
                      borderBottom: "1px solid #eee",
                      transition: "background-color 0.2s",
                    }}
                  >
                    <Box flex={1}>
                      <Typography fontWeight="600">{doc.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doc.desc}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleView(doc.file)}
                        sx={{ minWidth: 100 }}
                      >
                        Ver
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownload(doc.file, doc.title + '.pdf')}
                        sx={{ minWidth: 130 }}
                      >
                        Descargar
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Box>
            ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DocumentsPage;