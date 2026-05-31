import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const MainLayout = () => {
  const user: any = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="d-flex">
      <Sidebar permissions={user?.permissions} />

      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
