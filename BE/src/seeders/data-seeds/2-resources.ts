import { RESOURCE_LIST } from "../../lib/constant.js";
import { prisma } from "../../prismaClient.js";

const seedResources = async () => {
  await prisma.resource.createMany({
    data: RESOURCE_LIST.map((resource) => ({
      name: resource,
    })),
    skipDuplicates: true,
  });

  console.log("Resources seeded");
};

export default seedResources;
