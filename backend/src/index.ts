import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import recipeRoute from "./routes/recipeRoute";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./database/connectDB";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DIRNAME = path.resolve();


// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};
app.use(cors(corsOptions));

// API routes - this is where the error might be occurring
app.use("/api/v1/user", userRoute);
app.use("/api/v1/recipe", recipeRoute);

// Static files and catch-all route
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(DIRNAME, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(DIRNAME, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});