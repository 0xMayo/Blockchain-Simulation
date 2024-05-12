import { writeFileAsync, readFileAsync } from './fileManager.js';
import { blockchain } from '../startup.js';

const writeBlockchainData = async () => {
    try {
      await writeFileAsync('data', 'blockchainData.json', JSON.stringify(blockchain.chain, null, 2));
    } catch (error) {
      console.error('Error writing blockchain data to file:', error);
    }
  };

const readBlockchainData = async () => {
    try {
        const blockchainData = await readFileAsync('data', 'blockchainData.json');
        return JSON.parse(blockchainData);
    } catch (error) {
        throw new Error('Failed to read blockchain data: ' + error.message);
    }
};

const updateBlockchainData = async () => {
  try {
      const newBlockchainData = await readBlockchainData();
      blockchain.chain = newBlockchainData;
  } catch (error) {
      if (error.code === 'ENOENT') {
          return
      }
  }
}


  export { writeBlockchainData, readBlockchainData, updateBlockchainData }