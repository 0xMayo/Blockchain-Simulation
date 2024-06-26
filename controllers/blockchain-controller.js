import { blockchain } from '../startup.js';
import ResponseModel from '../utilities/ResponseModel.js';
import ErrorResponse from '../utilities/ErrorResponse.js';
import { writeBlockchainData, updateBlockchainData } from '../utilities/blockchainData.js';

const getAllBlocks = async (req, res, next) => {
  res.status(200).json(new ResponseModel({ statusCode: 200, data: blockchain }));
}

const createBlock = async (req, res, next) => {
  await updateBlockchainData();

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
    nonce,
    difficulty
  );

  blockchain.memberNodes.forEach(async (url) => {
    const body = block;
    await fetch(`${url}/api/v1/blockchain/block/broadcast`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  await writeBlockchainData();

  res.status(201).json(new ResponseModel({
    success: true,
    data: { message: 'The block has been created and distributed', block },
  }));
};

const broadcast = (req, res, next) => {
  const block = req.body;
  const lastBlock = blockchain.getLastBlock();
  const hash = lastBlock.currentBlockHash === block.previousBlockHash;
  const index = lastBlock.blockIndex + 1 === block.blockIndex;

  if (hash && index) {
    blockchain.chain.push(block);
    res.status(201).json(new ResponseModel({
      success: true,
      statusCode: 201,
      data: { message: 'The block has been added and sent' },
    }));
  } else {
    res
      .status(500)
      .json(new ErrorResponse({
        success: false,
        statusCode: 500,
        data: { message: 'The block has been rejected' },
      }));
  }
};

const synchronizeChain = (req, res, next) => {
  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  blockchain.memberNodes.forEach(async (member) => {
    const response = await fetch(`${member}/api/v1/blockchain`);
    if (response.ok) {
      const result = await response.json();

      if (result.data.chain.length > maxLength) {
        maxLength = result.data.chain.length;
        longestChain = result.data.chain;
      }

      if (
        !longestChain ||
        (longestChain && !blockchain.validateChain(longestChain))
      ) {
        console.log('Synchronized');
      } else {
        blockchain.chain = longestChain;
      }
    }
  });

  res.status(200).json(new ResponseModel({
    success: true,
    statusCode: 200,
    data: { message: 'Sync has finished' },
  }));
};

export { createBlock, getAllBlocks, synchronizeChain, broadcast };