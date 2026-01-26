import { DateExpression, model, models, ObjectId, Schema } from "mongoose";

enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type Order = {
  _id: ObjectId;
  user: ObjectId;
  totalPrice: Number;
  foodOrderItems: FoodOrderItem[];
  status: FoodOrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
};

export const orderSchema = new Schema<Order>({
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
  //   order: { type: String },
  ttl: { type: Date },
  isVerified: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const UserModel = models["Users"] || model<Order>("User", orderSchema);
