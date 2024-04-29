export const getBlocks = (req, res, next) => {
    res.status(200).json({ message: 'Fetching all blocks' });
  };
  
  export const getBlock = (req, res, next) => {
    res.status(200).json({ message: `Fetching block with index: ${req.params.index}` });
  };
  
  export const createBlock = (req, res, next) => {
    res.status(201).json({ message: 'Creating a new block' });
  };
  