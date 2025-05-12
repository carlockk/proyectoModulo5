import React, { useEffect, useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext'; // agregado para habilitar el botón de agregar al carrito

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1555992336-cd5fabd61c9d?auto=format&fit=crop&w=1600&q=80'
];

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function Home() {
  const { agregarAlCarrito } = useContext(CarritoContext); // ✅ Agregado para poder usar la función

  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const items = (data.meals || []).slice(0, 5);
        setDestacados(items);
      })
      .catch(err => console.error('❌ Error al cargar platos:', err))
      .finally(() => setLoading(false));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <>
      {/* SLIDER de imágenes con 4 imágenes funcionales */}
      <Box sx={{ width: '100%', overflow: 'hidden', mt: 0, px: 0 }}>
        <Slider {...sliderSettings}>
          {images.map((img, i) => (
            <Box key={i}>
              <img
                src={img}
                alt={`slide-${i}`}
                style={{
                  width: '100vw',
                  height: 300,
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Sección de productos destacados */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h5" gutterBottom>🛒 Más Vendidos</Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
            gap={3}
          >
            {destacados.map((meal) => (
              <Card
                key={meal.idMeal}
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } // ✅ Animación suave al pasar el mouse
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {meal.strMeal}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
