import { PERMISSION_LIST } from "../../lib/constant.js";
import { prisma } from "../../prismaClient.js";

const seedPermissions = async () => {
  await prisma.permission.createMany({
    data: PERMISSION_LIST.map((action) => ({
      action: action,
    })),
    skipDuplicates: true,
  });

  console.log("Permissions Seeded");
};

export default seedPermissions;
