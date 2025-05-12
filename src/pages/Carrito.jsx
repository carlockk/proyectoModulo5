import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Snackbar,
  Alert,
  TextField,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCarrito } from '../context/CarritoContext';

export default function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    vaciarCarrito,
    actualizarCantidad
  } = useCarrito();

  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    direccion: '',
    email: ''
  });

  const calcularTotal = () => {
    return carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
  };

  const finalizarCompra = () => {
    if (!form.nombre || !form.direccion || !form.email) {
      alert('Por favor completa todos los campos del formulario.');
      return;
    }

    // 📝 Guardar en historial (localStorage)
    const historial = JSON.parse(localStorage.getItem('historialCompras')) || [];
    const nuevoPedido = {
        cliente: form,
        productos: carrito,
        fecha: new Date().toLocaleString('es-CL')  // 🇨🇱 Formato local para Chile
      };      
    historial.push(nuevoPedido);
    localStorage.setItem('historialCompras', JSON.stringify(historial));

    setCompraFinalizada(true);
    vaciarCarrito();
    setForm({ nombre: '', direccion: '', email: '' });
  };

  const incrementar = (id) => {
    const producto = carrito.find(p => p.idMeal === id);
    actualizarCantidad(id, (producto?.cantidad || 1) + 1);
  };

  const disminuir = (id) => {
    const producto = carrito.find(p => p.idMeal === id);
    if (producto && producto.cantidad > 1) {
      actualizarCantidad(id, producto.cantidad - 1);
    }
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>🛒 Carrito de Compras</Typography>

      {carrito.length === 0 ? (
        <Typography variant="body1">Tu carrito está vacío.</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {carrito.map((item, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.strMealThumb}
                    alt={item.strMeal}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.strMeal}</Typography>

                    {/* Controles de cantidad */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <IconButton onClick={() => disminuir(item.idMeal)} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" fontWeight="bold">
                        {item.cantidad || 1}
                      </Typography>
                      <IconButton onClick={() => incrementar(item.idMeal)} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>

                    {/* Eliminar */}
                    <IconButton color="error" onClick={() => eliminarDelCarrito(item.idMeal)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total y acciones */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" color="error" onClick={vaciarCarrito}>
                Vaciar Carrito
              </Button>
              <Button variant="contained" color="primary" onClick={finalizarCompra}>
                Finalizar Compra
              </Button>
            </Box>
            <Typography variant="h6" sx={{ alignSelf: 'center' }}>
              Total: {calcularTotal()} unidad{calcularTotal() === 1 ? '' : 'es'}
            </Typography>
          </Box>

          {/* Formulario */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>Datos del Cliente</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Nombre"
                  fullWidth
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Dirección"
                  fullWidth
                  value={form.direccion}
                  onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Correo Electrónico"
                  type="email"
                  fullWidth
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      <Snackbar
        open={compraFinalizada}
        autoHideDuration={3000}
        onClose={() => setCompraFinalizada(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }} onClose={() => setCompraFinalizada(false)}>
          ¡Compra finalizada con éxito!
        </Alert>
      </Snackbar>
    </Container>
  );
}
