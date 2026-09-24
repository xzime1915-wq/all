import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// Simple inventory value report
router.get('/value', async (_, res) => {
  const products = await prisma.product.findMany({ select: { quantity: true, price: true } });
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  res.json({ totalValue });
});

// Low‑stock alert report
router.get('/low-stock', async (_, res) => {
  const threshold = Number(process.env.LOW_STOCK_THRESHOLD || 10);
  const lowStock = await prisma.product.findMany({
    where: { quantity: { lt: threshold } },
  });
  res.json(lowStock);
});

export default router;
