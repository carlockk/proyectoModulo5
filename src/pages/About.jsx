import React from 'react';
import { Container, Typography, Box } from '@mui/material';

export default function About() {
  return (
    <Container
      sx={{
        py: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 4 },
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: '1.8rem', sm: '2.4rem' } }}
      >
        Sobre Nosotros
      </Typography>

      <Box
        component="img"
        src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
        alt="Cocina de Coffee Waffles"
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: 600 },
          borderRadius: 3,
          boxShadow: 3,
          my: { xs: 3, sm: 5 },
        }}
      />

      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: '1rem', sm: '1.1rem' },
          lineHeight: 1.7,
          textAlign: 'justify',
        }}
      >
        <strong>Coffee Waffles</strong> nace en septiembre de 2016 y se ejecutó como tal con su inauguración en diciembre de 2016.
        Somos una pareja de jóvenes que se forma producto de la necesidad de querer emprender y dejar nuestros trabajos para vivir una nueva aventura.
        <br /><br />
        Desde ahí en adelante, solo hemos trabajado para lograr mejorar día a día nuestros productos y servicios, manteniendo la calidad en relación al precio.
        <br /><br />
        Con el tiempo hemos adaptado el servicio a las necesidades actuales y hemos creado productos nuevos que tanto nosotros como el resto esperamos que sean de su total agrado.
        <br /><br />
        Siempre innovando y probando nuevas recetas, trataremos de hacer lo mejor posible por y para ustedes.
        <br /><br />
        <em>Coffee Waffles &copy; {new Date().getFullYear()} - Todos los derechos reservados.</em>
      </Typography>
    </Container>
  );
}
