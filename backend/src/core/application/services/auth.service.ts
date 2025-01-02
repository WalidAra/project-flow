import { JwtHelper } from "@/helpers";
import { ValidateError } from "../errors";
import bcrypt from "bcrypt";
import { userRepo } from "@/core/infrastructure/repositories";

type AuthInput = {
  email: string;
  password: string;
  recall?: boolean;
};

const AuthService = {
  signIn: async ({ password, email, recall = false }: AuthInput) => {
    if (!email || !password) {
      throw new ValidateError("All credentials are required", 400);
    }

    const isUser = await userRepo.findUserByEmail(email);

    if (!isUser) {
      throw new ValidateError("User not found", 404);
    }

    const match = await isUser.verifyPassword(password);

    if (!match) {
      throw new ValidateError("Invalid password", 400);
    }

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: isUser.id, recall },
      recall,
      true
    );

    isUser.clearUnwantedFields();

    return { user: isUser.getData(), accessToken, refreshToken };
  },
  register: async ({
    email,
    password,
    name,
    recall = false,
  }: AuthInput & { name: string }) => {
    if (!email || !password || !name) {
      throw new ValidateError("All credentials are required", 400);
    }

    const isUser = await userRepo.findUserByEmail(email);

    if (isUser) {
      throw new ValidateError("User already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: user.id, recall },
      recall,
      true
    );

    user.clearUnwantedFields();

    return { user: user.getData(), accessToken, refreshToken };
  },

  googleAuth: async (profile: any) => {
    const { displayName, emails, photos } = profile;
    const email = emails[0].value;
    const image = photos[0].value;

    const isUser = await userRepo.findUserByEmail(email, "GOOGLE");

    if (!isUser) {
      const newUser = await userRepo.createUser({
        name: displayName,
        email,
        image,
        provider: "GOOGLE",
        password: "",
      });

      const { accessToken, refreshToken } = JwtHelper.generateToken(
        { id: newUser.id, recall: true },
        true,
        true
      );

      newUser.clearUnwantedFields();

      return {
        user: newUser.getData(),
        accessToken,
        refreshToken,
      };
    }

    const { accessToken, refreshToken } = JwtHelper.generateToken(
      { id: isUser.id, recall: true },
      true,
      true
    );

    isUser.clearUnwantedFields();

    return {
      user: isUser.getData(),
      accessToken,
      refreshToken,
    };
  },

  refresh: async (refreshToken: string | null) => {
    if (!refreshToken) {
      throw new ValidateError("Unauthorized - no token provided", 404);
    }

    const decoded = JwtHelper.verifyToken(refreshToken);

    const { id, recall } = decoded;

    const user = await userRepo.findUserById(id);

    if (!user) {
      throw new ValidateError("User not found", 404);
    }

    const { accessToken } = JwtHelper.generateToken(
      { id: user.id, recall },
      recall,
      false
    );

    return { accessToken };
  },
};

export default AuthService;
