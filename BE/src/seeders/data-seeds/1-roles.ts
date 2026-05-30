import { ROLE_LIST } from "../../lib/constant.js";
import { prisma } from "../../prismaClient.js";

const seedRoles = async () => {
  await prisma.role.createMany({
    data: ROLE_LIST.map((role) => ({
      name: role,
    })),
    skipDuplicates: true,
  });

  console.log("Roles Seeded");
};

export default seedRoles;
