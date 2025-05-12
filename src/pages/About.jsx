import React from 'react';
import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        Sobre Nosotros
      </Typography>
      <Typography variant="body1">
        Coffee Waffles nace en septiembre de 2016 y se ejecutó como tal con su inauguración en diciembre de 2016.
Somos una pareja de jóvenes que se forma producto de la necesidad de querer emprender y dejar nuestros trabajos para vivir una nueva aventura.
Desde ahí en adelante, solo hemos trabajado para lograr mejorar día a día nuestros productos y servicios! manteniendo la calidad en relación al precio!.
Con el tiempo hemos adaptado el servicio a las necesidades actuales, y hemos creado productos nuevos que tanto nosotros como el resto esperamos que sea de su total agrado!

Siempre innovando y probando nuevas recetas trataremos de hacer lo mejor posible por y para ustedes!.
Coffee Waffles todos los derechos reservados del presente año!
      </Typography>
    </Container>
  );
}
