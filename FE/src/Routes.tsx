import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import { routes } from "./constant/routes";
import Home from "./components/home";
import MainLayout from "./components/main-layout";
import Tasks from "./components/tasks";
import Users from "./components/users";
import Projects from "./components/projects";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.REGISTER} element={<Register />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.TASKS} element={<Tasks />} />
          <Route path={routes.USERS} element={<Users />} />
          <Route path={routes.PROJECTS} element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
