// // // import { useState } from "react";
// // // import { Button } from "../ui/button";

// // // const Login = () => {
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   return (
// // //     <>
// // //       <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
// // //         <div className="w-full max-w-md">
// // //           {/* Logo */}
// // //           <div className="flex justify-center mb-8">
// // //             <Link to="/" className="flex items-center gap-2">
// // //               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
// // //                 <Sparkles className="h-5 w-5" />
// // //               </div>

// // //               <span className="text-2xl font-bold tracking-tight">Taskora</span>
// // //             </Link>
// // //           </div>

// // //           {/* Card */}
// // //           <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
// // //             <div className="mb-6 text-center">
// // //               <h1 className="text-2xl font-bold">Welcome back</h1>
// // //               <p className="mt-2 text-sm text-muted-foreground">
// // //                 Sign in to manage your tasks smarter.
// // //               </p>
// // //             </div>

// // //             <form className="space-y-5">
// // //               {/* Email */}
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="email">Email</Label>
// // //                 <Input id="email" type="email" placeholder="you@example.com" />
// // //               </div>

// // //               {/* Password */}
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="password">Password</Label>

// // //                 <div className="relative">
// // //                   <Input
// // //                     id="password"
// // //                     type={showPassword ? "text" : "password"}
// // //                     placeholder="Enter your password"
// // //                     className="pr-10"
// // //                   />

// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
// // //                   >
// // //                     {showPassword ? (
// // //                       <EyeOff className="h-4 w-4" />
// // //                     ) : (
// // //                       <Eye className="h-4 w-4" />
// // //                     )}
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               {/* Login */}
// // //               <Button type="submit" className="w-full">
// // //                 Sign In
// // //               </Button>
// // //             </form>

// // //             {/* Register */}
// // //             <p className="mt-6 text-center text-sm text-muted-foreground">
// // //               Don't have an account?{" "}
// // //               <Link
// // //                 to="/register"
// // //                 className="font-medium text-primary hover:underline"
// // //               >
// // //                 Create account
// // //               </Link>
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default Login;

// // import { LockKeyhole, Mail, Sparkles } from "lucide-react";
// // import { Link } from "react-router";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";

// // const Login = () => {
// //   return (
// //     <div className="min-h-screen bg-background text-foreground">
// //       <div className="flex min-h-screen">
// //         {/* Left Branding */}
// //         <div className="relative hidden w-1/2 overflow-hidden bg-blue-100 dark:bg-blue-950 lg:flex">
// //           <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
// //           <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />

// //           <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
// //             {/* Logo */}
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20">
// //                 <Sparkles className="h-6 w-6 text-white" />
// //               </div>

// //               <div>
// //                 <h1 className="text-xl font-bold tracking-tight">Taskora</h1>

// //                 <p className="text-[9px] font-semibold tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
// //                   AI TASK MANAGER
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Main Text */}
// //             <div className="max-w-lg">
// //               <h2 className="text-4xl font-bold leading-tight xl:text-5xl">
// //                 Manage your tasks.
// //                 <br />
// //                 <span className="text-indigo-600 dark:text-indigo-400">
// //                   Get things done.
// //                 </span>
// //               </h2>

// //               <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
// //                 Organize your work, stay focused, and use AI to manage your
// //                 tasks faster and smarter.
// //               </p>
// //             </div>

// //             {/* Bottom */}
// //             <p className="text-sm text-muted-foreground">
// //               © 2026 Taskora. All rights reserved.
// //             </p>
// //           </div>
// //         </div>

// //         {/* Login Section */}
// //         <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
// //           <div className="w-full max-w-md">
// //             {/* Mobile Logo */}
// //             <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
// //               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600">
// //                 <Sparkles className="h-5 w-5 text-white" />
// //               </div>

// //               <div>
// //                 <h1 className="text-lg font-bold">Taskora</h1>

// //                 <p className="text-[8px] font-semibold tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
// //                   AI TASK MANAGER
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Heading */}
// //             <div className="mb-8">
// //               <h2 className="text-3xl font-bold tracking-tight">
// //                 Welcome back
// //               </h2>

// //               <p className="mt-2 text-sm text-muted-foreground">
// //                 Sign in to continue to your Taskora account.
// //               </p>
// //             </div>

// //             {/* Login Card */}
// //             <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
// //               <form className="space-y-5">
// //                 {/* Email */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="email">Email</Label>

// //                   <div className="relative">
// //                     <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

// //                     <Input
// //                       id="email"
// //                       type="email"
// //                       placeholder="you@example.com"
// //                       className="h-11 pl-10"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Password */}
// //                 <div className="space-y-2">
// //                   <div className="flex items-center justify-between">
// //                     <Label htmlFor="password">Password</Label>

// //                     <Link
// //                       to="/forgot-password"
// //                       className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
// //                     >
// //                       Forgot password?
// //                     </Link>
// //                   </div>

// //                   <div className="relative">
// //                     <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

// //                     <Input
// //                       id="password"
// //                       type="password"
// //                       placeholder="Enter your password"
// //                       className="h-11 pl-10"
// //                     />
// //                   </div>
// //                 </div>

// //                 {/* Remember Me */}
// //                 <div className="flex items-center gap-2">
// //                   <input
// //                     id="remember"
// //                     type="checkbox"
// //                     className="h-4 w-4 rounded border-border accent-indigo-600"
// //                   />

// //                   <Label
// //                     htmlFor="remember"
// //                     className="cursor-pointer text-sm font-normal text-muted-foreground"
// //                   >
// //                     Remember me
// //                   </Label>
// //                 </div>

// //                 {/* Login Button */}
// //                 <Button
// //                   type="submit"
// //                   className="h-11 w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
// //                 >
// //                   Sign in
// //                 </Button>
// //               </form>

// //               {/* Divider */}
// //               <div className="my-6 flex items-center gap-3">
// //                 <div className="h-px flex-1 bg-border" />

// //                 <span className="text-xs text-muted-foreground">OR</span>

// //                 <div className="h-px flex-1 bg-border" />
// //               </div>

// //               {/* Google */}
// //               <Button type="button" variant="outline" className="h-11 w-full">
// //                 <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
// //                   <path
// //                     fill="currentColor"
// //                     d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.92v2.42h3.14c1.84-1.69 2.93-4.18 2.93-7.37Z"
// //                   />
// //                   <path
// //                     fill="currentColor"
// //                     d="M12 21.99c2.63 0 4.84-.87 6.45-2.35l-3.14-2.42c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.5A9.74 9.74 0 0 0 12 21.99Z"
// //                   />
// //                   <path
// //                     fill="currentColor"
// //                     d="M6.51 14.11A5.85 5.85 0 0 1 6.2 12c0-.73.12-1.44.31-2.11V7.39H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.61l3.24-2.5Z"
// //                   />
// //                   <path
// //                     fill="currentColor"
// //                     d="M12 5.86c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 2.91 14.63 2 12 2a9.74 9.74 0 0 0-8.73 5.39l3.24 2.5c.78-2.31 2.94-4.03 5.49-4.03Z"
// //                   />
// //                 </svg>
// //                 Continue with Google
// //               </Button>
// //             </div>

// //             {/* Register */}
// //             <p className="mt-6 text-center text-sm text-muted-foreground">
// //               Don't have an account?{" "}
// //               <Link
// //                 to="/register"
// //                 className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
// //               >
// //                 Create account
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import { LockKeyhole, Mail, Sparkles } from "lucide-react";
// import { Link } from "react-router";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const Login = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="mb-8 flex justify-center">
//           <Link to="/" className="flex items-center gap-2.5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600 shadow-lg">
//               <Sparkles className="h-5 w-5 text-white" />
//             </div>

//             <div>
//               <h1 className="text-xl font-bold tracking-tight">Taskora</h1>

//               <p className="text-[8px] font-semibold tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
//                 AI TASK MANAGER
//               </p>
//             </div>
//           </Link>
//         </div>

//         {/* Card */}
//         <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
//           <div className="mb-6 text-center">
//             <h2 className="text-2xl font-bold">Welcome back</h2>

//             <p className="mt-2 text-sm text-muted-foreground">
//               Sign in to continue to Taskora.
//             </p>
//           </div>

//           <form className="space-y-5">
//             {/* Email */}
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className="h-11 pl-10"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>

//               <div className="relative">
//                 <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="Enter your password"
//                   className="h-11 pl-10"
//                 />
//               </div>
//             </div>

//             {/* Login */}
//             <Button
//               type="submit"
//               className="h-11 w-full bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
//             >
//               Sign In
//             </Button>
//           </form>

//           {/* Register */}
//           <p className="mt-6 text-center text-sm text-muted-foreground">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
//             >
//               Create account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/axios";
import { toast } from "react-toastify";

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post("/auth/login", data);

      const { token } = response.data;

      localStorage.setItem("token", token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);

      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
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
