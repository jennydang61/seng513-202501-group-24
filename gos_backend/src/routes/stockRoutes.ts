import { Router } from 'express';
import { fetchStockHistory } from '../controllers/stockController';

const router = Router();

router.get('/historical/:symbol', fetchStockHistory);

export default router;