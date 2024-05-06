import express from 'express';
import { getAllBlocks, getBlock, createBlock } from '../controllers/blockchain-controller.js';

export const router = express.Router();

router.route('/').get(getAllBlocks);
router.route('/mine').post(createBlock);
router.route('/:index').get(getBlock);

export default router;