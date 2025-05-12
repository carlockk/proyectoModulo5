import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Badge,
  Link,
  Modal
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link as RouterLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

// Íconos informativos
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GavelIcon from '@mui/icons-material/Gavel';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';

// Formulario
import FormularioContacto from './FormularioContacto';

const pages = [
  { name: 'HOME', path: '/' },
  { name: 'SOBRE NOSOTROS', path: '/about' },
  { name: 'PRODUCTOS', path: '/productos' },
  { name: 'MIS COMPRAS', path: '/mis-compras' }
];

export default function NavbarComponent() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { carrito } = useCarrito();
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const infoLinks = [
    { name: 'Datos de transferencia', href: '#', icon: <AccountBalanceIcon fontSize="small" /> },
    { name: 'Políticas de compra', href: '#', icon: <GavelIcon fontSize="small" /> },
    { name: 'Contáctanos', onClick: () => setModalOpen(true), icon: <EmailIcon fontSize="small" /> },
    { name: 'Carrito de eventos', href: '#', icon: <EventIcon fontSize="small" /> }
  ];

  return (
    <>
      {/* 🔝 BARRA SUPERIOR - Solo visible en escritorio */}
      {!isMobile && (
        <Box sx={{ backgroundColor: '#f5f5f5', color: '#333', px: 2, py: 0.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 3,
              fontSize: '0.85rem',
              flexWrap: 'wrap',
            }}
          >
            {infoLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href || '#'}
                underline="hover"
                color="inherit"
                onClick={link.onClick || undefined}
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </Box>
        </Box>
      )}

      {/* 🔻 BARRA PRINCIPAL */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          m: 0,
          backgroundColor: '#000',
          color: '#fff',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo + texto */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src="https://i0.wp.com/coffeewaffles.cl/wp-content/uploads/2020/08/cropped-logowaffler-8.png?fit=250%2C251&ssl=1"
              alt="Coffee Waffles Logo"
              style={{ height: 40 }}
            />
            <Typography
              variant="h6"
              sx={{ ml: 1.5, fontWeight: 'bold', color: '#213547' }}
            >
              COFFEE WAFFLES
            </Typography>
          </Box>

          {/* Navegación + carrito */}
          {isMobile ? (
            <>
              <Badge badgeContent={totalCantidad} color="secondary" sx={{ mr: 2 }}>
                <IconButton color="inherit" component={RouterLink} to="/carrito">
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 240 }} onClick={() => setDrawerOpen(false)}>
                  <List>
                    {pages.map((page) => (
                      <ListItem
                        button
                        key={page.name}
                        component={RouterLink}
                        to={page.path}
                      >
                        <ListItemText primary={page.name} />
                      </ListItem>
                    ))}

                    <Box sx={{ mt: 1, px: 2, fontWeight: 'bold', fontSize: '0.9rem', color: '#888' }}>
                      Información
                    </Box>

                    {infoLinks.map((link) => (
                      <ListItem
                        button
                        key={link.name}
                        component={link.href ? 'a' : 'button'}
                        href={link.href || undefined}
                        onClick={link.onClick || undefined}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        {link.icon}
                        <ListItemText primary={link.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  color="inherit"
                  component={RouterLink}
                  to={page.path}
                >
                  {page.name}
                </Button>
              ))}
              <Badge badgeContent={totalCantidad} color="secondary">
                <IconButton color="inherit" component={RouterLink} to="/carrito">
                  <ShoppingCartIcon />
                </IconButton>
              </Badge>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Modal del formulario de contacto */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <FormularioContacto />
        </Box>
      </Modal>
    </>
  );
}
