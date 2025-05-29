"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/recipeRoutes.ts
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const router = express_1.default.Router();
router.post('/', isAuthenticated_1.isAuthenticated, recipeController_1.createRecipe);
router.get('/', recipeController_1.getAllRecipes);
router.delete('/:id', recipeController_1.deleteRecipe);
router.put('/:id', recipeController_1.updateRecipe);
router.put('/:id/like', isAuthenticated_1.isAuthenticated, recipeController_1.likeRecipe);
exports.default = router;
