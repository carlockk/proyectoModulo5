import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const RecipeDetail = () => {
  const location = useLocation();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <Container>
        <Typography variant="h5">❌ No se encontró la receta</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        {recipe.strMeal}
      </Typography>

      <Box
        component="img"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        sx={{ width: '100%', maxWidth: 400, borderRadius: 3, mb: 4 }}
      />

      <Typography variant="h5" gutterBottom>Ingredientes:</Typography>
      <Typography variant="body1" gutterBottom>{recipe.strIngredient1}, {recipe.strIngredient2}...</Typography>

      <Typography variant="h5" gutterBottom>Instrucciones:</Typography>
      <Typography variant="body2">{recipe.strInstructions}</Typography>
    </Container>
  );
};

export default RecipeDetail;
