import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { prisma } from "../../prismaClient.js";

const seedRolePermissions = async () => {
  const filePath = path.join("build", "seeders", "csv", "role-permissions.csv");

  const file = fs.readFileSync(filePath, "utf-8");

  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });

  const roles = await prisma.role.findMany();
  const resources = await prisma.resource.findMany();
  const permissions = await prisma.permission.findMany();

  const roleMap = Object.fromEntries(roles.map((r: any) => [r.name, r.id]));
  const resourceMap = Object.fromEntries(
    resources.map((r: any) => [r.name, r.id]),
  );
  const permissionMap = Object.fromEntries(
    permissions.map((p: any) => [p.action, p.id]),
  );

  const data = records.map((row: any) => ({
    role_id: roleMap[row.role],
    resource_id: resourceMap[row.resource],
    permission_id: permissionMap[row.permission],
  }));

  await prisma.rolePermission.createMany({
    data,
    skipDuplicates: true,
  });
};

export default seedRolePermissions;
