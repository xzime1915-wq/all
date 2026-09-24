import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import productRouter from './routes/products';
import authRouter from './routes/auth';
import reportRouter from './routes/reports';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Simple health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

// Auth routes
app.use('/api/auth', authRouter);
// Product CRUD routes (protected)
app.use('/api/products', productRouter);
// Reporting routes (protected)
app.use('/api/reports', reportRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});

export { prisma };
