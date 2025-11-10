import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const WelcomeHeader = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #003a7a 100%)`,
        color: 'white',
        p: 3,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Typography variant="body1">{subtitle}</Typography>
    </Box>
  );
};

export default WelcomeHeader;
