import { Router } from 'express';
import { initialFundHandler } from '../controllers/fund.controller';

const fundRoutes = Router();

// prefix: /fund
fundRoutes.post("/initial", initialFundHandler);

export default fundRoutes;