// src/components/FormularioContacto.jsx
import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

export default function FormularioContacto() {
  return (
    <Box
      sx={{
        width: { xs: '90%', sm: 400 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        📩 Contáctanos
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" variant="outlined" fullWidth />
        <TextField label="Correo" variant="outlined" fullWidth type="email" />
        <TextField label="Mensaje" variant="outlined" fullWidth multiline rows={4} />
        <Button variant="contained" color="primary" fullWidth>Enviar</Button>
      </Box>
    </Box>
  );
}
