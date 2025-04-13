import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import complaintRouter from "./routes/complaint.routes.js"
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaint",complaintRouter)

ConnectDB();

export  {app};
