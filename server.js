import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import blockchainRoutes from './routes/blockchain-routes.js';
import errorHandler from './middleware/errorHandler.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config/.env' });

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/blockchain', blockchainRoutes);

// Catch all url...
app.all('*', (req, res, next) => {
    next(new ErrorResponse(`Could not find the resource ${req.originalUrl}`, 404));
  });

// Central error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);