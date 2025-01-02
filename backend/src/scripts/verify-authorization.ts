import { envConfig } from "@/config";
import { ValidateError } from "@/core/application/errors";
import { userRepo } from "@/core/infrastructure/repositories";
import { JwtHelper } from "@/helpers";

const verifyAuthorization = async ({
  authHeader,
}: {
  authHeader: string | undefined;
}) => {
  if (!authHeader) {
    throw new ValidateError("Authentication failed: No token provided", 403);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== envConfig.authBearer || !token) {
    throw new ValidateError("Authentication failed: Invalid token format", 403);
  }

  try {
    const decoded = JwtHelper.verifyToken(token) as {
      id: string;
      recall: boolean;
    };

    const user = await userRepo.findUserById(decoded.id);

    if (!user) {
      throw new ValidateError(
        "Authentication failed: Account is inactive",
        403
      );
    }

    return { user, decoded };
  } catch (err: any) {
    throw new ValidateError(err.message || "Invalid token");
  }
};

export default verifyAuthorization;
