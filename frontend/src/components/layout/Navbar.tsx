import {
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "react-toastify";

const Navbar = () => {
  //   const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!");

    // setTimeout(() => {
    //   navigate("/login");
    // }, 200);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="leading-none">
            <h1 className="text-base font-bold tracking-tight text-foreground">
              Taskora
            </h1>

            <p className="mt-1 text-[9px] font-semibold tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
              AI TASK MANAGER
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/dashboard"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            Dashboard
          </a>

          <a
            href="/tasks"
            className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            Tasks
          </a>

          <a
            href="/ai-assistant"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Assistant
          </a>
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Theme Toggle */}
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

          <div className="mx-1 h-7 w-px bg-border" />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="gap-2 rounded-xl px-2 hover:bg-muted"
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white">
                    RK
                  </AvatarFallback>
                </Avatar>

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold leading-none">Ranjana</p>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Personal
                  </p>
                </div>

                <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-75 sm:w-90">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-600">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  Taskora
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-2">
                <a
                  href="/dashboard"
                  className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Dashboard
                </a>

                <a
                  href="/tasks"
                  className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Tasks
                </a>

                <a
                  href="/ai-assistant"
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                  AI Assistant
                </a>

                <div className="my-3 h-px bg-border" />

                {/* Mobile Theme */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}

                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>

                <div className="my-3 h-px bg-border" />

                {/* Mobile Profile */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-linear-to-br from-indigo-600 to-violet-600 text-xs font-semibold text-white">
                      RK
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-semibold">Ranjana</p>

                    <p className="text-xs text-muted-foreground">
                      Personal account
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
