import { model, models, ObjectId, Schema, Model } from "mongoose";

enum UserRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

type User = {
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: UserRoleEnum;
  orderedFoods: ObjectId[];
  ttl: Date;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
};

export const userSchema = new Schema<User>(
  {
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.USER,
      required: true,
    },
    orderedFoods: [{ type: Schema.Types.ObjectId, ref: "FoodOrder" }],
    ttl: { type: Date },
    isVerified: { type: Boolean },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true },
);

userSchema.index(
  { ttl: 1 },
  {
    expireAfterSeconds: 0,
  },
);

export const UserModel: Model<User> =
  models["User"] || model("User", userSchema);
