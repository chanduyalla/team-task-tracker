import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems, footerItems } from "../constant/sidebar";
import { logout } from "../api/auth";

type Permissions = Record<string, string[]>;

interface SidebarProps {
  permissions: Permissions;
}

const Sidebar = ({ permissions }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const hasAccess = (module?: string) => {
    if (!module) return true;
    return permissions[module]?.includes("READ");
  };

  const accessibleMenus = menuItems.filter((item: any) =>
    hasAccess(item.module),
  );

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await logout(refreshToken as string);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#52ab98",
      }}
    >
      {/* Main menu */}
      <ul className="nav nav-pills flex-column gap-2 mb-auto">
        {accessibleMenus.map((item: any) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? "active" : "text-white"
              }`}
              style={{
                backgroundColor:
                  location.pathname === item.path ? "#2b6777" : "transparent",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer menu */}
      <ul className="nav nav-pills flex-column gap-2 mt-auto">
        {footerItems.map((item: any) => (
          <li key={item.label} className="nav-item">
            {item.label.toLowerCase() === "logout" ? (
              <button
                onClick={handleLogout}
                className="nav-link text-white w-100 text-start"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                {item.label}
              </button>
            ) : (
              <Link
                to={item.path}
                className="nav-link text-white"
                style={{ backgroundColor: "transparent" }}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
