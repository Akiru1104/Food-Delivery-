import { Router } from "express";

import { signUpUser } from "../controllers/users/sign-up-user.controller";
import { signInUser } from "../controllers/users/sign-in-user.controller";
import { verifyPass as verifyUser } from "../controllers/users/verify.user.controller";
import { refreshUser } from "../controllers/users/refresh-user.controller";
import { resetPasswordRequest } from "../controllers/users/reset-pass.controller";
import { confirmResetPass } from "../controllers/users/reset-req-pass.controller";
import { getCurrentUser } from "../controllers/users/get-current-user.controller";
import { updateUser } from "../controllers/users/update-user.controller";

export const userRouter = Router();

userRouter.post("/refresh-token", refreshUser);
userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);
userRouter.post("/reset-password", resetPasswordRequest);
userRouter.post("/verify-reset-password", confirmResetPass);
userRouter.get("/verify-user", verifyUser);
userRouter.get("/get-current-user", getCurrentUser);
userRouter.patch("/update", updateUser);
