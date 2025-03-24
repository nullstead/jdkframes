import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expressEjsLayouts from 'express-ejs-layouts';

import imageRoutes from './routes/imageRoutes.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

app.use((req, res, next) => { // Make multer available to routes
  req.upload = upload;
  next();
});

// Configure multer for memory storage (needed for S3 upload)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// View engine integration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressEjsLayouts);
app.set('layout', 'layouts/main');

// Serving static files
app.use(express.static(__dirname + '/public'));

//Routes
app.use(imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});