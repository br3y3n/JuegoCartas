import { config } from "dotenv";
import express from "express";
import cors from 'cors'

config({ path: '.env' });

const app = express();
testConnection()
app.use(cors())
const PORT = 7777;
app.listen(PORT, () => {
    console.log(`server working properly ${PORT}`)
});

