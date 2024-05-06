import { blockchain } from "../startup.js";

export const getAllBlocks = (req, res, next) => {
    res.status(200).json({ success: true, data: blockchain, message: 'Fetching all blocks' });
  };
  
  export const createBlock = (req, res, next) => {
    res.status(201).json({ message: 'Creating a new block' });
  };
  
    export const getBlock = (req, res, next) => {
    res.status(200).json({ message: `Fetching block with index: ${req.params.index}` });
  };