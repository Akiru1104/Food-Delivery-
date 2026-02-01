import { isValidObjectId, model, models, ObjectId, Schema } from "mongoose";

type Food = {
  foodName: string;
  price: Number;
  image: string;
  ingredients: string;
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
    category: { type: Schema.Types.ObjectId },
  },
  { timestamps: true },
);

export const FoodModel = models["Food"] || model<Food>("Food", foodSchema);
