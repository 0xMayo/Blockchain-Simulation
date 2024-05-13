import express from 'express';
import cors from 'cors';
import blockchainRoutes from './routes/blockchain-routes.js';
import memberRouter from './routes/member-routes.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import ErrorResponse from './utilities/ErrorResponse.js';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.argv[2];
const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(express.json());
app.use(cors());

app.use(logger);

app.use('/api/v1/blockchain', blockchainRoutes);
app.use('/api/v1/members', memberRouter);

app.all('*', (req, res, next) => {
    next(new ErrorResponse(`Could not find the resource ${req.originalUrl}`, 404));
  });

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running on port ${PORT}`
  )
);