import { Link, NavLink, useNavigate } from "react-router";

import {
  Bot,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../ThemeProvider";
import { Button } from "../ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  console.log({ user });

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/dashboard" className="text-lg font-bold tracking-tight">
          Task<span className="text-primary">Flow</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className={navLinkClass}>
            <ListTodo size={17} />
            Tasks
          </NavLink>

          <NavLink to="/ai-assistant" className={navLinkClass}>
            <Bot size={17} />
            AI Assistant
          </NavLink>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-xl hover:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}

            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-muted"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="hidden text-left sm:block">
              <p className="max-w-28 truncate text-sm font-semibold">
                {user?.name || "User"}
              </p>

              <p className="max-w-28 truncate text-xs text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
