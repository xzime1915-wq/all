import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';


function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Box component="img" src={Logo} alt="Company logo" sx={{ height: 40, mr: 2 }} />
          <h1 style={{ margin: 0, color: 'white' }}>Inventory Management</h1>
        </Toolbar>
      </AppBar>
      {/* Product creation form */}
      <ProductForm onSuccess={() => window.location.reload()} />
      {/* Product list */}
      <ProductList />
    </Container>
  );
}

export default App;
