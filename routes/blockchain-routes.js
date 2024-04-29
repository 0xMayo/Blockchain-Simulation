import express from 'express';
import { getBlocks, getBlock, createBlock } from '../controllers/blockchain-controller.js';

export const router = express.Router();

router.get('/', getBlocks);
router.get('/:index', getBlock);
router.post('/', createBlock);

export default router;