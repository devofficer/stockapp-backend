import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from 'body-parser';
import axios from "axios";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);   
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const FINNHUB_URL: string = process.env.FINNHUB_URL as string;
const FINNHUB_KEY: string = process.env.FINNHUB_KEY as string;
const app = express();


app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/stock/:ticker', async (req, res) => {
    const { ticker } = req.params;
    const url = `${FINNHUB_URL}/quote`;
    const result = await axios.get(url, {params: { symbol: ticker, token: FINNHUB_KEY }});
    res.json(result.data);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

