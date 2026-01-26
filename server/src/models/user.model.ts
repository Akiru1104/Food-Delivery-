import { DateExpression, model, models, ObjectId, Schema } from "mongoose";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  _id: ObjectId;
  email: String;
  password: String;
  phoneNumber: String;
  adress: String;
  role: UserRoleEnum;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const userSchema = new Schema<User>({
  _id: { type: String },
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  adress: { type: String },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.USER,
    required: true,
  },
  orderedFoods: {
    String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.USER,
    required: true,
  },
  ttl: { type: Date },
  isVerified: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const UserModel = models["Users"] || model<User>("User", userSchema);
