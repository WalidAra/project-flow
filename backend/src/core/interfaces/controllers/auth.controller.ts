import { Request, RequestHandler, Response } from "express";
import { AuthService } from "@/core/application/services";
import { error500 } from "@/constants";
import { ValidateError } from "@/core/application/errors";
import { envConfig } from "@/config";
import { TokenExpiredError } from "jsonwebtoken";

const AuthController = {
  signIn: (async (req: Request, res: Response) => {
    try {
      const { email, password, recall } = req.body as {
        email: string;
        password: string;
        recall?: boolean;
      };

      const { user, refreshToken, accessToken } = await AuthService.signIn({
        password,
        email,
        recall,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      res.status(200).json({
        message: "User signed in successfully",
        data: { ...user, accessToken },
      });
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        return res.status(e.status).json({ message: e.message, data: null });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  signUp: (async (req: Request, res: Response) => {
    try {
      const { email, password, name, recall } = req.body as {
        email: string;
        password: string;
        name: string;
        recall: boolean;
      };
      const { user, refreshToken, accessToken } = await AuthService.register({
        email,
        password,
        name,
        recall,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });

      res.status(201).json({
        message: "User signed up successfully",
        data: { ...user, accessToken },
      });
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        return res.status(e.status).json({ message: e.message, data: null });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  googleAuth: (async (req: Request, res: Response) => {
    try {
      if (req.user) {
        const { accessToken, refreshToken } = req.user as {
          accessToken: string;
          refreshToken: string;
          user: object;
        };

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          path: "/",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        res.redirect(
          `${envConfig.googleJavascriptOrigins}/?token=${accessToken}`
        );
      }
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        return res.status(e.status).json({ message: e.message, data: null });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  refreshToken: (async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken as string | null;

    console.log("refresh token :", refreshToken);

    try {
      const { accessToken } = await AuthService.refresh(refreshToken);

      res.status(201).json({
        message: "Token refreshed successfully",
        data: { accessToken },
      });
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        return res.status(e.status).json({ message: e.message, data: null });
      } else if (e instanceof TokenExpiredError) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        return res.status(403).json({ message: e.message, data: null });
      }

      return res.status(500).json(error500);
    }
  }) as RequestHandler,

  signOut: (async (_req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

      res
        .status(200)
        .json({ message: "User signed out successfully", data: null });
    } catch {
      return res.status(500).json(error500);
    }
  }) as RequestHandler,
};

export default AuthController;
