import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0056b3', // --pucese-blue
    },
    secondary: {
      main: '#FFD700', // --pucese-gold
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          marginBottom: 20,
          border: 'none',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: '#0056b3',
          color: 'white',
          borderRadius: '8px 8px 0 0 !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // MUI default is uppercase; match original
        },
      },
    },
  },
  // Custom CSS variables for consistency
  variables: {
    '--pucese-blue': '#0056b3',
    '--pucese-gold': '#FFD700',
    '--light-bg': '#f8f9fa',
  },
});

export default theme;
