import { Router } from "express";

import { signUpUser } from "../controllers/users/sign-up-user.controller";
import { signInUser } from "../controllers/users/sign-in-user.controller";
import { Test } from "../controllers/users/test.controller";

export const userRouter = Router();

userRouter.post("/sign-up", signUpUser);
userRouter.post("/sign-in", signInUser);
userRouter.get("/test-np", Test);
