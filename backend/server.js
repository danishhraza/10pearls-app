const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const pino = require('pino');
const logger = pino({ transport: { target: 'pino-pretty' } });

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: 'Server error' });
});

app.listen(process.env.PORT, () => logger.info(`Server running on port ${process.env.PORT}`));