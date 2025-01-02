import { User } from "@/core/domain/entities";

type AuthorizationDTO = {
  user: User;
  decoded: { id: string; recall: boolean };
};

export default AuthorizationDTO;
