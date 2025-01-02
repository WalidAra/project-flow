import { Entity } from "@/core/application/base";
import { ProviderDTO, UserDTO } from "@/core/application/dto";
import bcrypt from "bcrypt";

class User implements Entity {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  image: string | null;
  provider: ProviderDTO | undefined;
  password: string | undefined;

  constructor(user: UserDTO) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.image = user.image;
    this.provider = user.provider;
    this.password = user.password;
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (this.password) {
      return await bcrypt.compare(password, this.password);
    }
    return false;
  }

  clearUnwantedFields() {
    this.password = undefined;
    if (this.provider !== undefined) {
      this.provider = undefined;
    }
  }

  getData: () => object = () => ({
    id: this.id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt,
    image: this.image,
    provider: this.provider,
  });
}

export default User;
