// src/routes/recipeRoutes.ts
import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, likeRecipe, updateRecipe } from '../controllers/recipeController';
import { isAuthenticated } from '../middlewares/isAuthenticated';


const router = express.Router();

router.post('/', isAuthenticated, createRecipe);
router.get('/', getAllRecipes);
router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);
router.put('/:id/like', isAuthenticated, likeRecipe);

export default router;
