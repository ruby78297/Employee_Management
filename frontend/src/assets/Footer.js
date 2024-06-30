import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#b2d8d8',
        padding: '20px 0',
        
        bottom: 0,
        left: 0,
        zIndex: 1300,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="textSecondary" align="center">
          © {new Date().getFullYear()} Pragvas Technologies. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
