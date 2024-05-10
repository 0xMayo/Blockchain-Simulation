import { blockchain } from "../startup.js";
import blockchainData from "../data/blockchainData.json" with {type:"json"};
import {v4 as uuidv4} from 'uuid';
import ResponseModel from "../utilities/ResponseModel.js";
import ErrorResponse from "../utilities/errorResponse.js";
import { writeFileSync, writeFileAsync } from "../utilities/fileManager.js";

const folder = 'data';
const file = 'blockchainData.json';

export const getAllBlocks = (req, res, next) => {
  res.status(200).json(new ResponseModel({ statusCode: 200, data: blockchain }));
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

  
    
    res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
  };

    export const getBlock = (req, res, next) => {
    res.status(200).json({ message: `Fetching block with id: ${req.params.id}` });
  };

  // writeFileAsync(folder, file, JSON.stringify(blockchain.chain));

  // writeFileAsync(folder, file, JSON.stringify(blockchain.chain))
  // .then(() => {
  //   res.status(201).json(new ResponseModel({ statusCode: 201, data: block }));
  // })
  // .catch(error => {
  //   res.status(500).json(new ResponseModel({ statusCode: 500, error: error.toString() }));
  // });