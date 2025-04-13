import express from "express";
// import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
// import { errorHandler } from "./middlewares/errorHandler.js";


dotenv.config()
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true, // Allow credentials (cookies, authentication headers)
}));
app.use(express.static("public"));
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));




// app.use("error",errorHandler);

// import adminRoutes from "./routes/admin.routes.js";
// import facultyRoutes from "./routes/faculty.routes.js";

// app.use("/api/admin", adminRoutes);
// app.use("/api/faculty", facultyRoutes);
// 
export {app};