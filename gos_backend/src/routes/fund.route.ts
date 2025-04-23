import { Router } from 'express';
import { initialFundHandler, getInitialFundHandler } from '../controllers/fund.controller';

const fundRoutes = Router();

// prefix: /fund
fundRoutes.post("/", initialFundHandler);
fundRoutes.get("/", getInitialFundHandler);

export default fundRoutes;