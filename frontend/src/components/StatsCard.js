import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StatsCard = ({ icon: Icon, title, number, subtitle }) => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      textAlign: 'center', 
      p: 4.3, 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      borderRadius: '4px',
    }}>
      <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ fontSize: '2rem', color: '#0056b3', mb: 1 }}>
          {Icon ? <Icon /> : null}
        </Box>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#0056b3', mb: 0.5 }}>
          {number}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsCard;