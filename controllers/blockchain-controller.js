import { blockchain } from "../startup.js";

export const getAllBlocks = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain, message: 'Fetching all blocks' });
  };
  
  export const createBlock = (req, res, next) => {
    const lastBlock = blockchain.getLastBlock();
    const data = req.body;
    const { nonce, difficulty, timestamp } = blockchain.proofOfWork(
      lastBlock.currentBlockHash,
      data
    );

    const currentBlockHash = blockchain.hashBlock(
      timestamp,
      lastBlock.currentBlockHash,
      data,
      nonce,
      difficulty
    );
  
    const block = blockchain.createBlock(
      timestamp,
      lastBlock.currentBlockHash,
      currentBlockHash,
      data,
      difficulty
    );
    
    res.status(201).json({ success: true, data: block, message: 'Creating a new block' });
  };

    export const getBlock = (req, res, next) => {
    res.status(200).json({ message: `Fetching block with index: ${req.params.index}` });
  };