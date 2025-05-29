
import { Request, Response } from "express";
import { Types } from "mongoose";
import User from "../models/userModal";
import { Recipe } from "../models/recipeModal";


export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.id);
        console.log("createRecipe user:", user);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const newRecipe = new Recipe({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            user: user._id,
            createdAt: new Date()
        });
        const savedRecipe = await newRecipe.save();

        res.status(201).json(savedRecipe);
    } catch (err) {
        res.status(500).json({ message: "Failed to create recipe" });
    }
};

export const getAllRecipes = async (_req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await Recipe.find().populate('user', 'fullName email');
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
};

export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }
        await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete recipe" });
        console.log("Error deleting recipe:", error);
    }
};

export const updateRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }

        recipe.title = req.body.title ?? recipe.title;
        recipe.description = req.body.description ?? recipe.description;
        recipe.image = req.body.image ?? recipe.image;

        const updated = await recipe.save();
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update recipe" });
        console.log("Error updating recipe:", error);
    }
};

export const likeRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
            return;
        }

        const userId = new Types.ObjectId(user._id);
        const likedIndex = recipe.likes.findIndex(likeId => likeId.equals(userId));

        if (likedIndex >= 0) {
            recipe.likes.splice(likedIndex, 1);
        } else {
            recipe.likes.push(userId);
        }

        const updated = await recipe.save();
        res.status(200).json(updated);
       
    } catch (err) {
        res.status(500).json({ message: "Failed to like recipe" });
    }
};
