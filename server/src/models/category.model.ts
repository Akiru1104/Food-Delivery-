import { model, models, Schema } from "mongoose";

type Category = {
  categoryName: String;
};

export const categorySchema = new Schema<Category>(
  {
    categoryName: { type: String },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel =
  models["Category"] || model<Category>("Category", categorySchema);
