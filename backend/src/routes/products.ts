import { Router } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

// GET all products
router.get('/', async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

// GET single product
router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

// CREATE product
router.post('/', async (req, res) => {
  const { name, sku, quantity, price } = req.body;
  const product = await prisma.product.create({
    data: { name, sku, quantity, price },
  });
  res.status(201).json(product);
});

// UPDATE product
router.put('/:id', async (req, res) => {
  const { name, sku, quantity, price } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: { name, sku, quantity, price },
  });
  res.json(product);
});

// DELETE product
router.delete('/:id', async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
