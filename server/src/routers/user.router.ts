import { Router } from "express";

import { signUpUser } from "../controllers/users/sign-up-user.controller";
import { signInUser } from "../controllers/users/sign-in-user.controller";
import { verifyPass } from "../controllers/users";
import { refreshUser } from "../controllers/users/refresh-user.controller";
import { resetPasswordRequest } from "../controllers/users/reset-pass.controller";
import { confirmResetPass } from "../controllers/users/reset-req-pass.controller";

export const userRouter = Router();

userRouter.post("/refresh-token", refreshUser);
userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);
userRouter.post("/reset-password", resetPasswordRequest);
userRouter.get("/verify-reset-password/:token", confirmResetPass);
userRouter.get("/verify-user", verifyPass);
