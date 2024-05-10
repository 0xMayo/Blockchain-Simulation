import express from 'express';
import { getAllBlocks, createBlock, synchronizeChain, broadcast  } from '../controllers/blockchain-controller.js';

export const router = express.Router();

router.route('/').get(getAllBlocks);
router.route('/mine').post(createBlock);
router.route('/concensus').get(synchronizeChain);
router.route('/block/broadcast').post(broadcast);

export default router;