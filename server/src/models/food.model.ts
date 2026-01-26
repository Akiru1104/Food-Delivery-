import { isValidObjectId, model, models, ObjectId, Schema } from "mongoose";

type Food = {
  _id: ObjectId;
  foodName: String;
  price: Number;
  image: String;
  ingredients: String;
  category: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const foodSchema = new Schema<Food>({
  // _id: {type : isValidObjectId },
  foodName: { type: String },
  price: { type: Number },
  image: { typep: String },
  ingredients: { type: String },
  // category: {type: ObjectId},
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const FoodModel = models["Food"] || model<Food>("Food", foodSchema);
