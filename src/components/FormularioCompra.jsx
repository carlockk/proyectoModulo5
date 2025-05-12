// src/components/FormularioCompra.jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';

export default function FormularioCompra({ onFinalizar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.nombre && formData.correo && formData.direccion) {
      onFinalizar(); // limpia carrito o realiza lógica
      setMensaje('✅ ¡Compra realizada con éxito!');
      setOpen(true);
      setFormData({ nombre: '', correo: '', direccion: '' });
    } else {
      setMensaje('❌ Por favor completa todos los campos');
      setOpen(true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>Finaliza tu compra</Typography>

      <TextField
        label="Nombre completo"
        name="nombre"
        fullWidth
        margin="normal"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <TextField
        label="Correo electrónico"
        name="correo"
        fullWidth
        margin="normal"
        type="email"
        value={formData.correo}
        onChange={handleChange}
        required
      />
      <TextField
        label="Dirección"
        name="direccion"
        fullWidth
        margin="normal"
        value={formData.direccion}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Finalizar Compra
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity={mensaje.startsWith('✅') ? 'success' : 'error'} onClose={() => setOpen(false)}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}
