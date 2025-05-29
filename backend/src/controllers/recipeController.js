"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRecipe = exports.updateRecipe = exports.deleteRecipe = exports.getAllRecipes = exports.createRecipe = void 0;
const mongoose_1 = require("mongoose");
const userModal_1 = __importDefault(require("../models/userModal"));
const recipeModal_1 = require("../models/recipeModal");
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModal_1.default.findById(req.id);
        console.log("createRecipe user:", user);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const newRecipe = new recipeModal_1.Recipe({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            user: user._id,
            createdAt: new Date()
        });
        const savedRecipe = yield newRecipe.save();
        res.status(201).json(savedRecipe);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to create recipe" });
    }
});
exports.createRecipe = createRecipe;
const getAllRecipes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipeModal_1.Recipe.find().populate('user', 'fullName email');
        res.status(200).json(recipes);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
});
exports.getAllRecipes = getAllRecipes;
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield recipeModal_1.Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        yield recipeModal_1.Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete recipe" });
        console.log("Error deleting recipe:", error);
    }
});
exports.deleteRecipe = deleteRecipe;
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const recipe = yield recipeModal_1.Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        recipe.title = (_a = req.body.title) !== null && _a !== void 0 ? _a : recipe.title;
        recipe.description = (_b = req.body.description) !== null && _b !== void 0 ? _b : recipe.description;
        recipe.image = (_c = req.body.image) !== null && _c !== void 0 ? _c : recipe.image;
        const updated = yield recipe.save();
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update recipe" });
        console.log("Error updating recipe:", error);
    }
});
exports.updateRecipe = updateRecipe;
const likeRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModal_1.default.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const recipe = yield recipeModal_1.Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        const userId = new mongoose_1.Types.ObjectId(user._id);
        const likedIndex = recipe.likes.findIndex(likeId => likeId.equals(userId));
        if (likedIndex >= 0) {
            recipe.likes.splice(likedIndex, 1);
        }
        else {
            recipe.likes.push(userId);
        }
        const updated = yield recipe.save();
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(500).json({ message: "Failed to like recipe" });
    }
});
exports.likeRecipe = likeRecipe;
