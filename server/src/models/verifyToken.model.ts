import mongoose, { Schema } from "mongoose";

const VerifyTokenSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    code: { type: String, required: true },
    expireAt: { type: Date, required: true },
  },
  { timestamps: true },
);

VerifyTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const VerifyTokenModel =
  mongoose.models.VerifyToken ||
  mongoose.model("VerifyToken", VerifyTokenSchema);
