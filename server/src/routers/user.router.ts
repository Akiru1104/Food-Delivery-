import { Router } from "express";

import { signUpUser } from "../controllers/users/sign-up-user.controller";
import { signInUser } from "../controllers/users/sign-in-user.controller";

import { verifyUserEmail } from "../utils/mail-utils";
import { verifyUser } from "../controllers/users";

export const userRouter = Router();

userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);

userRouter.get("verify-user", verifyUser);
