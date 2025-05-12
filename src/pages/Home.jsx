import React, { useEffect, useState } from 'react';
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
      {/* SLIDER */}
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

      {/* CONTENIDO */}
      <Container sx={{ py: 5 }}>
        {/* MAPA */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h5" gutterBottom>¿Dónde estamos?</Typography>
          <Box sx={{ border: '1px solid #999999', borderRadius: 2, overflow: 'hidden' }}>
            <iframe
              title="Mapa"
              src="https://maps.google.com/maps?q=Ohiggins%20430b,%20Copiapó,%20Chile&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Box>
        </Box>

        {/* DESTACADOS */}
        <Typography variant="h5" gutterBottom>Platos Destacados</Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              py: 2,
              px: 1,
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' }
            }}
          >
            {destacados.map((meal) => (
              <Card
                key={meal.idMeal}
                sx={{
                  minWidth: 220,
                  maxWidth: 220,
                  flex: '0 0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  borderRadius: 3
                }}
              >
                <CardMedia
                  component="img"
                  image={meal.strMealThumb}
                  alt={meal.strMeal}
                  sx={{ height: 140, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {meal.strMeal}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {meal.strInstructions.split(' ').slice(0, 15).join(' ')}...
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
