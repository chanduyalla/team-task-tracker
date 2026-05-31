import { RESOURCE_LIST } from "../../lib/constant.js";
import { prisma } from "../../prismaClient.js";
import { hashPassword } from "../../utils/password.js";

const seedAdminUser = async () => {
  if (!process.env.ADMIN_USER_PASSWORD) {
    throw new Error("ADMIN_USER_PASSWORD is not set");
  }
  const role = await prisma.role.findUnique({ where: { name: "ADMIN" } });
  if (!role) {
    throw new Error("Admin role not found");
  }
  const userData = {
    first_name: "admin",
    last_name: "user",
    email: "admin@gmail.com",
    password: await hashPassword(process.env.ADMIN_USER_PASSWORD),
    role_id: role?.id,
  };
  await prisma.user.createMany({
    data: [userData],
    skipDuplicates: true,
  });

  console.log("Admin user seeded");
};

export default seedAdminUser;
