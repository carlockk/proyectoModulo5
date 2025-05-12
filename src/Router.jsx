import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import RecipeList from './pages/RecipeList';
import Carrito from './pages/Carrito';
import Layout from './components/Layout';
import HistorialCompras from './pages/HistorialCompras';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/productos" element={<Layout><RecipeList /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/carrito" element={<Layout><Carrito /></Layout>} />
      <Route path="/mis-compras" element={<Layout><HistorialCompras /></Layout>} />
    </Routes>
  );
}
