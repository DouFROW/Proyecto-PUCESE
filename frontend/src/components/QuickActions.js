import React from "react";
import { Button, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const QuickActions = ({
  onLoanRequest,
  onRegisterMember,
  onGenerateReport,
  isAdmin = false,
}) => {
  if (!isAdmin) return null;

  const adminButtons = [
    {
      label: "Registrar Socio",
      icon: PersonAddIcon,
      variant: "outlined",
      color: "primary",
      onClick: onRegisterMember,
    },
    {
      label: "Aprobar Préstamo ",
      icon: ReceiptIcon,
      variant: "outlined",
      color: "primary",
      onClick: onLoanRequest,
    },
    {
      label: "Generar Reporte",
      icon: PictureAsPdfIcon,
      variant: "outlined",
      color: "primary",
      onClick: onGenerateReport,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {adminButtons.map((btn, index) => (
        <Button
          key={index}
          variant={btn.variant}
          color={btn.color}
          startIcon={<btn.icon />}
          fullWidth
          onClick={btn.onClick}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontSize: "0.875rem",
          }}
        >
          {btn.label}
        </Button>
      ))}
    </Box>
  );
};

export default QuickActions;
