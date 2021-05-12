import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'
import routes from './routes/index.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(cors())

// database init
connectDB();
app.use(express.json());

app.use('/api/v1', routes);

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`app running on at http://localhost:${PORT}`)
})