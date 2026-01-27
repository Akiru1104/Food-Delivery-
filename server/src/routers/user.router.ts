import { Router } from "express";

import { signUpUser } from "../controllers/users/sign-up-user.controller";
import { signInUser } from "../controllers/users/sign-in-user.controller";

export const signUpRouter = Router();

signUpRouter.post("/sign-up", signUpUser);

signInRouter.post("/sign-in", signInUser);
