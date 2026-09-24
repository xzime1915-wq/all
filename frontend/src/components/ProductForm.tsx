import React, { useState } from 'react';
import { TextField, Button, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

export default function ProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [showScanner, setShowScanner] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('/api/products', { name, sku, quantity, price });
    setName('');
    setSku('');
    setQuantity(0);
    setPrice(0);
    onSuccess();
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setSku(data);
      setShowScanner(false);
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" fullWidth value={name} onChange={e => setName(e.target.value)} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="SKU" fullWidth value={sku} onChange={e => setSku(e.target.value)} required />
            <Button size="small" onClick={() => setShowScanner(!showScanner)} sx={{ mt: 1 }}>
              {showScanner ? 'Cancel Scan' : 'Scan QR / Barcode'}
            </Button>
            {showScanner && (
              <QrReader constraints={{ facingMode: 'environment' }} onResult={(result, error) => {
                if (!!result) handleScan(result.getText());
              }} style={{ width: '100%' }} />
            )}
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Quantity" type="number" fullWidth value={quantity} onChange={e => setQuantity(Number(e.target.value))} required />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Price" type="number" fullWidth value={price} onChange={e => setPrice(Number(e.target.value))} required />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Add Product</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
