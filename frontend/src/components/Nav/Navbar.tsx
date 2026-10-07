import { useState } from "react";
import { Menu, X, Sparkles, Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 via-violet-600 to-purple-600 shadow-lg shadow-indigo-200">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight text-slate-900">
                TaskFlow
              </span>
              <span className="text-[10px] font-medium tracking-wider text-indigo-600">
                AI POWERED
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <a
              href="/dashboard"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Dashboard
            </a>

            <a
              href="/tasks"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Tasks
            </a>

            <a
              href="/profile"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600"
            >
              Profile
            </a>
          </nav>

          {/* Right Side */}
          <div className="hidden items-center gap-3 md:flex">
            {/* Notification */}
            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />

              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {/* Divider */}
            <div className="h-7 w-px bg-slate-200" />

            {/* User */}
            <button className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                RK
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold leading-4 text-slate-800">
                  Ranjana
                </p>
                <p className="text-[11px] text-slate-500">Personal</p>
              </div>

              <ChevronDown className="ml-1 h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden">
            <nav className="flex flex-col gap-1">
              <a
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Dashboard
              </a>

              <a
                href="/tasks"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Tasks
              </a>

              <a
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                Profile
              </a>

              <div className="my-2 h-px bg-slate-100" />

              <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-slate-50">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-xs font-semibold text-white">
                  RK
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Ranjana
                  </p>
                  <p className="text-xs text-slate-500">Personal account</p>
                </div>
              </button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
