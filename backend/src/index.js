"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const recipeRoute_1 = __importDefault(require("./routes/recipeRoute"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDB_1 = __importDefault(require("./database/connectDB"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const DIRNAME = path_1.default.resolve();
// Basic middleware
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
const corsOptions = {
    origin: "http://localhost:4200",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
// API routes - this is where the error might be occurring
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/recipe", recipeRoute_1.default);
// Static files and catch-all route
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(DIRNAME, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.resolve(DIRNAME, "frontend", "dist", "index.html"));
    });
}
app.listen(PORT, () => {
    (0, connectDB_1.default)();
    console.log(`Server listening at port ${PORT}`);
});
