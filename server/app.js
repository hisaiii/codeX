import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import complaintRouter from "./routes/complaint.routes.js";
import cookieParser from 'cookie-parser';
import cityRouter from "./routes/city.routes.js"
dotenv.config();
const app = express();

// ✅ Setup CORS properly
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,   // important to allow cookies / tokens
}));

app.use(express.json()); // for parsing application/json
app.use(cookieParser()); 
// Your routes
app.use("/api/user", authRoutes);
app.use("/api/complaint", complaintRouter);
app.use("/api/authorities",cityRouter)
ConnectDB();

export { app };
