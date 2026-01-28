import { model, models, ObjectId, Schema, Model } from "mongoose";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  adress: string;
  role: UserRoleEnum;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: Boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const userSchema = new Schema<User>({
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  adress: { type: String },
  role: {
    type: String,
    enum: Object.values(UserRoleEnum),
    default: UserRoleEnum.USER,
    // required: true,
  },
  // orderedFoods: {
  //   String,
  //   enum: Object.values(UserRoleEnum),
  //   default: UserRoleEnum.USER,
  //   required: true,
  // },
  ttl: { type: Date },
  isVerified: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const UserModel: Model<User> =
  models["User"] || model("User", userSchema);
