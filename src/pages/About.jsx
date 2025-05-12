import React from 'react';
import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sobre Nosotros
      </Typography>
      <Typography variant="body1">
        Somos una tienda comprometida con ofrecer los mejores productos.
        Nos dedicamos a entregar una excelente experiencia a nuestros clientes.
      </Typography>
    </Container>
  );
}
