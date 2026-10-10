import { LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  // const onSubmit = async (data: LoginFormData) => {
  //   try {
  //     const response = await api.post("/auth/login", data);

  //     const { token } = response.data;

  //     localStorage.setItem("token", token);

  //     toast.success(response.data.message);

  //     navigate("/");
  //   } catch (error: any) {
  //     console.error(error);

  //     const message =
  //       error.response?.data?.message || "Login failed. Please try again.";

  //     toast.error(message);
  //   }
  // };

  const { refreshUser } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);

      const token = response.data.token;

      localStorage.setItem("token", token);

      await refreshUser();

      navigate("/");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold">Taskora</h1>

              <p className="text-[8px] font-semibold tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
                AI TASK MANAGER
              </p>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Welcome back</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue to Taskora.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 pl-10"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </div>

              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 pl-10"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
