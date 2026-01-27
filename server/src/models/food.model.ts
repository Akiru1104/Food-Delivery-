import { isValidObjectId, model, models, ObjectId, Schema } from "mongoose";

type Food = {
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const foodSchema = new Schema<Food>(
  {
    foodName: { type: String },
    price: { type: Number },
    image: { typep: String },
    ingredients: { type: String },
    category: { type: isValidObjectId },
  },
  { timestamps: true },
);

export const FoodModel = models["Food"] || model<Food>("Food", foodSchema);
