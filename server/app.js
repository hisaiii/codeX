import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import complaintRoutes from './routes/complaint.routes.js'; // 👈 Yeh add kar

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaint", complaintRoutes); // 👈 Yeh register kar

ConnectDB();

export { app };
