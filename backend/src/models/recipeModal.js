"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
const mongoose_1 = require("mongoose");
// Create the schema
const recipeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
    description: { type: String },
    vegetarian: { type: Boolean, default: false },
    likes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: { createdAt: true, updatedAt: false }, // Automatically sets `createdAt`
});
// Export the model
exports.Recipe = (0, mongoose_1.model)("Recipe", recipeSchema);
