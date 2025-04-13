import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

ConnectDB();

export  {app};
