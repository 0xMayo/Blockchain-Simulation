import express from 'express';
import cors from 'cors';
import blockchainRoutes from './routes/blockchain-routes.js';
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

// Middlewares
app.use(express.json());
app.use(cors());

// Logging all requests
app.use(logger);

// Routes
app.use('/api/v1/blockchain', blockchainRoutes);

// Catch all url...
app.all('*', (req, res, next) => {
    next(new ErrorResponse(`Could not find the resource ${req.originalUrl}`, 404));
  });

// Central error handler
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running on port ${PORT}`
  )
);