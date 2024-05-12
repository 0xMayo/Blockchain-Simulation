import Blockchain from './Blockchain.js';
import { describe, it, expect } from 'vitest';

describe('Blockchain', () => {
  describe('proofOfWork', () => {
    it('should adjust the difficulty based on the timestamp and last block', () => {
      const blockchain = new Blockchain();
      const lastBlock = blockchain.getLastBlock();
      const currentTime = lastBlock.timestamp + blockchain.MINE_RATE;
      const lastDifficulty = lastBlock.difficulty;
      const difficulty = blockchain.difficultyAdjustment(lastBlock, currentTime);

      if (currentTime - lastBlock.timestamp > blockchain.MINE_RATE) {
        expect(difficulty).toBe(lastDifficulty + 1);
      } else {
        expect(difficulty).toBe(lastDifficulty - 1);
      }
    });
  });
});
