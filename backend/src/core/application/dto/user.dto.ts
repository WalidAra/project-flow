import ProviderDTO from "@/core/application/dto/provider.dto";

type UserDTO = {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  image: string | null;
  provider: ProviderDTO | undefined;
  password: string | undefined;
};
export default UserDTO;
