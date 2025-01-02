import { prisma } from "@/config";
import { User } from "@/core/domain/entities";
import { userSelection } from "@/core/infrastructure/database";
import { ProviderDTO } from "@/core/application/dto";

const UserRepository = {
  findUserByEmail: async (email: string, provider: ProviderDTO = "DIRECT") => {
    const data = await prisma.user.findUnique({
      where: {
        email,
        provider,
      },
      select: {
        ...userSelection,
      },
    });
    return data ? new User(data) : null;
  },

  createUser: async ({
    email,
    password,
    name,
    image = null,
    provider = "DIRECT",
  }: {
    email: string;
    password: string;
    name: string;
    image?: string | null;
    provider?: ProviderDTO;
  }) => {
    const data = await prisma.user.create({
      data: {
        email,
        password,
        name,
        image,
        provider,
      },
      select: userSelection,
    });
    return new User(data);
  },

  findUserById: async (id: string) => {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: userSelection,
    });

    return data ? new User(data) : null;
  },
};

export default UserRepository;
