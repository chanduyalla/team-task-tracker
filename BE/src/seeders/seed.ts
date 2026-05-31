import fs from "fs";
import path from "path";
import seedRoles from "./data-seeds/1-roles.js";
import seedResources from "./data-seeds/2-resources.js";
import seedPermissions from "./data-seeds/3-permissions.js";
import seedRolePermissions from "./data-seeds/4-role-permissions.js";
import seedAdminUser from "./data-seeds/5-add-admin-user.js";

async function runSeeds() {
  //   const seedDir = path.join(process.cwd(), "build", "seeders", "data-seeds");
  //   const files = fs
  //     .readdirSync(seedDir)
  //     .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));
  //   for (const file of files) {
  //     const filePath = path.join(seedDir, file);
  //     const module = await import(filePath);
  //     const seedFn = Object.values(module)[0] as Function;
  //     if (typeof seedFn === "function") {
  //       console.log(`Running seed: ${file}`);
  //       await seedFn();
  //     }
  //   }

  await seedRoles();
  await seedResources();
  await seedPermissions();
  await seedRolePermissions();
  await seedAdminUser();
}

runSeeds();
