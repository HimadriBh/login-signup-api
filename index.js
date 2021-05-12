import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


const PORT = process.env.PORT || 8000;
const app = express();

dotenv.config();

app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home page')
})

app.listen(PORT, () => {
    console.log(`app running on at http://localhost:${PORT}`)
})