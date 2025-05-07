import express from 'express';
import dotenv from 'dotenv';
import router from './routes/api';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import rateLimiter from "express-rate-limit";
import helmet from "helmet"

const apiLimiter = rateLimiter({
    windowMs: 2 * 60 * 100,
    max: 30,
    message: "Too many request, please wait and try again later."
});

dotenv.config()

const app = express();

app.set('trust proxy', 1)
app.use(helmet())
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use('/api/v1/', apiLimiter, router);

const PORT = process.env.PORT || 1212;

app.listen(Number(PORT), () => {
    console.log(`Server running on http://localhost:${PORT}`);
});