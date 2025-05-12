import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Modal,
  Tooltip,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCarrito } from '../context/CarritoContext';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ITEMS_PER_PAGE = 10;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  maxWidth: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [mensajeAbierto, setMensajeAbierto] = useState(false);
  const [mostrarControles, setMostrarControles] = useState({});
  const { carrito, agregarAlCarrito, incrementarCantidad, disminuirCantidad } = useCarrito();

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRecipes(data.meals || []))
      .catch(err => {
        console.error('❌ Error al obtener recetas:', err);
        setRecipes([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = recipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => currentPage < totalPages && setCurrentPage(p => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(p => p - 1);
  const handleCardClick = (meal) => setSelectedRecipe(meal);
  const handleClose = () => setSelectedRecipe(null);

  const handleAgregarCarrito = (e, meal) => {
    e.stopPropagation();
    agregarAlCarrito(meal);
    setMostrarControles(prev => ({ ...prev, [meal.idMeal]: true }));
    setMensajeAbierto(true);
  };

  const renderIngredients = (recipe) => {
    return Array.from({ length: 20 }).map((_, i) => {
      const ing = recipe[`strIngredient${i + 1}`];
      const qty = recipe[`strMeasure${i + 1}`];
      return ing && ing.trim() ? <li key={i}>{`${ing} - ${qty}`}</li> : null;
    });
  };

  return (
    <Container sx={{ py: 5 }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Box key={i} sx={{ width: '18%', minWidth: 200 }}>
              <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
              <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
              <Skeleton variant="text" height={20} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {paginatedRecipes.map(meal => {
              const cantidadEnCarrito = carrito.find(p => p.idMeal === meal.idMeal)?.cantidad || 1;
              return (
                <Card
                  key={meal.idMeal}
                  onClick={() => handleCardClick(meal)}
                  sx={{
                    width: '18%',
                    minWidth: 200,
                    height: mostrarControles[meal.idMeal] ? 410 : 350,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    boxShadow: 3,
                    cursor: 'pointer',
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={meal.strMealThumb}
                    alt={meal.strMeal}
                    sx={{ height: 160, objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>{meal.strMeal}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        mt: 1,
                      }}
                    >
                      {meal.strInstructions}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 1 }}>
                    <Tooltip title="Agregar al carrito" arrow>
                      <IconButton
                        color="primary"
                        onClick={(e) => handleAgregarCarrito(e, meal)}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Ver más">
                      <IconButton color="secondary" onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(meal);
                      }}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Favorito">
                      <IconButton color="warning" onClick={(e) => e.stopPropagation()}>
                        <StarIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>

                  {/* Controles de cantidad */}
                  {mostrarControles[meal.idMeal] && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pb: 2 }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          disminuirCantidad(meal.idMeal);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{cantidadEnCarrito}</Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          incrementarCantidad(meal.idMeal);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  )}
                </Card>
              );
            })}
          </Box>

          {/* Paginación */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 2 }}>
            <Button variant="outlined" onClick={handlePrev} disabled={currentPage === 1}>Anterior</Button>
            <Typography sx={{ mt: 1.2 }}>Página {currentPage} de {totalPages}</Typography>
            <Button variant="outlined" onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</Button>
          </Box>

          {/* Modal */}
          <Modal open={!!selectedRecipe} onClose={handleClose}>
            <Box sx={modalStyle}>
              {selectedRecipe && (
                <>
                  <Typography variant="h5" gutterBottom>{selectedRecipe.strMeal}</Typography>
                  <Box
                    component="img"
                    src={selectedRecipe.strMealThumb}
                    alt={selectedRecipe.strMeal}
                    sx={{ width: '100%', maxHeight: 180, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                  />
                  <Typography variant="h6" gutterBottom>Ingredientes:</Typography>
                  <ul style={{ marginLeft: 20, paddingLeft: 0 }}>
                    {renderIngredients(selectedRecipe)}
                  </ul>
                  <Typography variant="h6" gutterBottom>Instrucciones:</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                    {selectedRecipe.strInstructions}
                  </Typography>
                </>
              )}
            </Box>
          </Modal>

          {/* Snackbar */}
          <Snackbar
            open={mensajeAbierto}
            autoHideDuration={3000}
            onClose={() => setMensajeAbierto(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert severity="success" sx={{ width: '100%' }} onClose={() => setMensajeAbierto(false)}>
              Producto agregado al carrito
            </Alert>
          </Snackbar>
        </>
      )}
    </Container>
  );
};

export default RecipeList;
