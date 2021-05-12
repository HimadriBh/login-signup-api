import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'

const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(cors())

// database init
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(PORT, () => {
    console.log(`app running on at http://localhost:${PORT}`)
})