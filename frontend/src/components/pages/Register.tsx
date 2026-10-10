import { LockKeyhole, Mail, Sparkles, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { toast } from "react-toastify";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await api.post("/auth/register", data);

      console.log(response);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="bg-background text-foreground flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-lg">
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
        <div className="border-border bg-card rounded-2xl border p-6 shadow-sm sm:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Create your account</h2>

            <p className="text-muted-foreground mt-2 text-sm">
              Start managing your tasks smarter.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>

              <div className="relative">
                <User className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="h-11 pl-10"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 pl-10"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
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
                <LockKeyhole className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="h-11 pl-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
