import { createHash } from "../utilities/crypto-library.js";
import Block from "./Block.js";

export default class Blockchain {
    constructor() {
        this.chain = [];
        // this.createBlock(Date.now(), '0', '0', []);
      }

    };