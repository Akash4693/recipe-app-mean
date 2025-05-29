import { Schema, model, Document, Types } from "mongoose";

// Define the TypeScript interface for the Recipe document
export interface IRecipe extends Document {
  title: string;
  user: Types.ObjectId; // Reference to User
  image: string;
  description: string;
  vegetarian: boolean;
  createdAt: Date;
  likes: Types.ObjectId[]; // References to Users who liked the recipe
}

// Create the schema
const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String },
    description: { type: String },
    vegetarian: { type: Boolean, default: false },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Automatically sets `createdAt`
  }
);

// Export the model
export const Recipe = model<IRecipe>("Recipe", recipeSchema);
