import axios from "axios";
import authenticationService, { SignInParams } from "@/services/authentication-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import qs from "qs";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function githubSignIn(req: Request, res: Response) {
  const code = req.query.code;
  console.log(code, req.query);
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`;
  try {
    const response = await axios.post(`https://github.com/login/oauth/access_token${params}`);
    const authData = qs.parse(response.data);

    if(authData.error) {
      throw new Error();
    }
    return res.status(httpStatus.OK).send({ accessToken: authData.access_token });
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getGithubUserData(req: Request, res: Response) {
  const accessToken = req.headers.authorization;

  try {
    const userData = await axios.get("https://api.github.com/user", {
      headers: {
        "Authorization": accessToken
      }
    });
    return res.status(httpStatus.OK).send(userData.data);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
