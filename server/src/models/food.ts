import { DateExpression, model, models, ObjectId, Schema } from "mongoose";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  _id: ObjectId;
  user: ObjectId;
  price: Number; 
  image: String; 
  ingredients: String; 
  category: ObjectId; 
  createdAt: Date; 
  updatedAt: Date;
};