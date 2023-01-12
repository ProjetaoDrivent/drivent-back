import { getGithubUserData, githubSignIn, singInPost } from "@/controllers";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);
authenticationRouter.post("/oauth/github/accessToken", githubSignIn);
authenticationRouter.get("/oauth/github/userData", getGithubUserData);

export { authenticationRouter };
