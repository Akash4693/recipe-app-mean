import { Schema, model, Document, Types } from "mongoose";

// TypeScript interface for the User document
export interface IUser extends Document {
  _id: Types.ObjectId | string;
  password: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

// Mongoose schema definition
const userSchema = new Schema<IUser>(
  {
    
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
  },
  {
    timestamps: false, // Disable auto timestamps if not needed
    versionKey: false,
  }
);

// Create and export the model
const User = model<IUser>("User", userSchema);
export default User;

