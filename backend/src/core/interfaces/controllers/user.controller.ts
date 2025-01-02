import { error500 } from "@/constants";
import { AuthorizationDTO } from "@/core/application/dto";
import { ValidateError } from "@/core/application/errors";
import { User } from "@/core/domain/entities";
import { Request, RequestHandler, Response } from "express";

const UserController = {
  getProfile: (async (req: Request, res: Response) => {
    try {
      const { user } = req.user as AuthorizationDTO;
      if (user instanceof User) {
        return res
          .status(200)
          .json({ message: "got user profile", data: user.getData() });
      }
    } catch (e: unknown) {
      if (e instanceof ValidateError) {
        return res.status(e.status).json({ message: e.message });
      }
      return res.status(500).json(error500);
    }
  }) as RequestHandler,
};

export default UserController;
