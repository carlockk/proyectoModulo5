import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';

export default function HistorialCompras() {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('historialCompras');
    if (data) {
      setCompras(JSON.parse(data));
    }
  }, []);

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>🧾 Mis Compras</Typography>

      {compras.length === 0 ? (
        <Typography>No hay pedidos aún.</Typography>
      ) : (
        <Grid container spacing={4}>
          {compras.map((pedido, index) => (
            <Grid item xs={12} key={index}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <Typography variant="h6" gutterBottom>
                    Pedido #{index + 1}
                  </Typography>
                  {pedido.fecha && (
                    <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
                      Fecha: {pedido.fecha}
                    </Typography>
                  )}
                </Box>

                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon fontSize="small" />
                    <Typography variant="body1">
                      Cliente: <strong>{pedido.cliente.nombre}</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon fontSize="small" />
                    <Typography variant="body1">
                      Dirección: <strong>{pedido.cliente.direccion}</strong>
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" />
                    <Typography variant="body1">
                      Email: <strong>{pedido.cliente.email}</strong>
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {pedido.productos.map((producto, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={producto.strMealThumb}
                          alt={producto.strMeal}
                        />
                        <CardContent>
                          <Typography variant="subtitle1" noWrap>
                            {producto.strMeal}
                          </Typography>
                          <Typography variant="body2">
                            Cantidad: {producto.cantidad}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
