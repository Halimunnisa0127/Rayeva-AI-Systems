// corsOptions.js
require("dotenv").config();

// Define your known origins
const allowedOrigins = [
  process.env.CLIENT_URL,           // your production frontend (e.g., https://sustainable-e-commerce.vercel.app)
  'http://localhost:3000',           // local development
  // add any other fixed origins if needed
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    // Normalize by removing trailing slash
    const normalizedOrigin = origin.replace(/\/$/, '');
    const normalizedAllowed = allowedOrigins.map(o => o ? o.replace(/\/$/, '') : null).filter(Boolean);

    // Allow if in normalized allowed list OR if it's any Vercel preview URL
    if (
      normalizedAllowed.includes(normalizedOrigin) ||
      normalizedOrigin.endsWith('.vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = corsOptions;