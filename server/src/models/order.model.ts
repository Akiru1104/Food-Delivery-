import { DateExpression, model, models, ObjectId, Schema } from "mongoose";

enum FoodOrderEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  DELIVERED = "DELIVERED",
}

type Order = {
  user: ObjectId;
  totalPrice: Number;
  foodOrderItems: {
    foodId: ObjectId;
    quantity: number;
  };
  status: FoodOrderEnum;
  createdAt: Date;
  updatedAt: Date;
};

const FoodOrderItem = new Schema(
  {
    food: { type: Schema.ObjectId, ref: "Food", required: true },
    quatity: { type: Number, required: true },
  },
  { _id: false },
);

const FoodOrderSchema = new Schema(
  { user: [{ type: String, required: true, ref: "Food" }], FoodOrderItem: [] },
  { timestamps: true },
);

export const orderSchema = new Schema<Order>({
  email: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  adress: { type: String },
  role: {
    type: String,
    enum: Object.values(FoodOrderEnum),
    default: FoodOrderEnum,
    required: true,
  },
  order: { type: String },
  ttl: { type: Date },
  isVerified: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export const OrderModel = models["Order"] || model<Order>("Order", orderSchema);
