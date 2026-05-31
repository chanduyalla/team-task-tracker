import { MODULES } from "./modules";
import { routes } from "./routes";

export const menuItems = [
  {
    label: "Home",
    path: routes.HOME,
  },
  {
    label: "Users",
    path: routes.USERS,
    module: MODULES.USERS,
  },
  {
    label: "Projects",
    path: routes.PROJECTS,
    module: MODULES.PROJECTS,
  },
  {
    label: "Tasks",
    path: routes.TASKS,
    module: MODULES.TASKS,
  },
];

export const footerItems = [
  {
    label: "Logout",
    path: "#",
  },
];
