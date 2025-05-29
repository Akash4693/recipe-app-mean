"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose schema definition
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date(), // Equivalent to @PrePersist
        immutable: true,
    },
}, {
    timestamps: false, // Disable auto timestamps if not needed
    versionKey: false,
});
// Create and export the model
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
