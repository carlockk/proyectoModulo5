import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Layout({ children }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Navbar fija arriba */}
      <NavbarComponent />

      {/* Contenido principal se expande para empujar el footer abajo */}
      <Box component="main" flex="1">
        {children}
      </Box>

      {/* Footer sticky abajo */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#000',
          color: 'white',
          py: 2,
          textAlign: 'center',
          mt: 'auto' // Asegura que se pegue abajo
        }}
      >
        <Typography variant="body2" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Catálogo Web. Todos los derechos reservados.
        </Typography>

        {/* Íconos sociales */}
        <Box>
          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component="a"
            href="#"
            target="_blank"
            rel="noopener"
            sx={{ color: 'white' }}
          >
            <YouTubeIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
