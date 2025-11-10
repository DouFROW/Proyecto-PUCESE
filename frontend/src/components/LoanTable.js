import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Chip } from "@mui/material";

const LoanTable = ({ rows, onActionClick }) => {
  const getChipColor = (status) => {
    const colors = {
      Aprobado: "success",
      Pendiente: "warning",
      Rechazado: "error",
    };
    return colors[status] || "default";
  };

  const getButtonStyle = (action) => {
    if (action === "Revisar") {
      return { color: "#0056b3", border: "1px solid #0056b3" };
    }
    return { color: "#0056b3", border: "1px solid #0056b3" };
  };

  const headers = ["Socio", "Monto", "Fecha", "Estado", "Acciones"];

  const handleActionClick = (row) => {
    if (onActionClick) {
      onActionClick(row);
    }
  };

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontWeight: "medium",
                  color: "#666",
                  fontSize: "0.875rem",
                  padding: "8px 16px",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell sx={{ padding: "8px 16px" }}>{row.Socio}</TableCell>
              <TableCell sx={{ padding: "8px 16px" }}>{row.Monto}</TableCell>
              <TableCell sx={{ padding: "8px 16px" }}>{row.Fecha}</TableCell>
              <TableCell sx={{ padding: "8px 16px" }}>
                <Chip
                  label={row.Estado}
                  size="small"
                  sx={{
                    backgroundColor:
                      row.Estado === "Aprobado"
                        ? "#28a745"
                        : row.Estado === "Pendiente"
                        ? "#ffc107"
                        : "#dc3545",
                    color: row.Estado === "Pendiente" ? "#212529" : "white",
                    fontSize: "0.75rem",
                    height: "24px",
                  }}
                />
              </TableCell>
              <TableCell sx={{ padding: "8px 16px" }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleActionClick(row)}
                  sx={{
                    ...getButtonStyle(row.Acciones),
                    textTransform: "none",
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    minWidth: "40px",
                  }}
                >
                  {row.Acciones}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LoanTable;
