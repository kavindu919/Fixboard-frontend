import Button from "../../components/Button";
import React, { useState } from "react";
import InputFeild from "../../components/InputField";
import PasswordField from "../../components/PasswordField";
import type { registerPageInterface } from "../../utils/interfaces/authInterface";
import { userRegistration } from "../../services/auth.services";
import { registerSchema } from "../../utils/validation/authSchema";
import { ZodError } from "zod";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<registerPageInterface>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const validData = registerSchema.parse(data);
      const res = await userRegistration(validData);
      if (res?.data.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0]?.message);
        return;
      }
      console.log(error);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid min-h-screen grid-cols-1  md:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-8 md:p-12 ">
        <div className="flex w-full flex-col gap-9 md:px-20 max-w-xl">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Sign Up for Fix Board
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <InputFeild
              name="name"
              type="text"
              text="Name"
              onChange={handleChange}
              required
            />
            <InputFeild
              name="email"
              type="email"
              text="Email"
              onChange={handleChange}
              required
            />
            <div className="flex flex-col items-center justify-between">
              <PasswordField
                name="password"
                type="password"
                text="Password"
                onChange={handleChange}
                required
              />
              <span className="mt-1 self-end text-xs">
                <a href="/resetpassword">Forgot password?</a>
              </span>
            </div>

            <div className="flex w-full flex-col gap-2">
              <Button
                text="Sign up"
                isLoading={loading}
                disabled={loading}
                type="submit"
              />
              <span className="mt-1 text-center">
                Have an Account?{" "}
                <span className="font-bold">
                  {/* <a href="/signup">Sign Up</a> */}
                </span>
              </span>
            </div>
          </form>
        </div>
      </div>

      <div className="relative hidden min-h-screen w-full overflow-hidden md:flex md:items-center md:justify-center bg-[#0a0a0a] font-slab">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20"></div>

        <div className="absolute top-10 right-10 h-20 w-20 rotate-45 border border-blue-500/30 animate-spin-slow"></div>
        <div className="absolute bottom-32 right-32 h-16 w-16 rotate-12 border-2 border-cyan-500/20 animate-float"></div>
        <div className="absolute top-1/3 right-20 h-24 w-24 -rotate-12 border border-purple-500/30 animate-float animation-delay-2000"></div>

        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/30 blur-3xl animate-blob"></div>
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-600/25 to-purple-600/25 blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 blur-3xl animate-blob animation-delay-4000"></div>

        <div className="absolute top-20 left-1/4 h-2 w-2 rounded-full bg-blue-400/60 animate-pulse"></div>
        <div className="absolute top-40 right-1/3 h-1.5 w-1.5 rounded-full bg-cyan-400/60 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 h-2 w-2 rounded-full bg-purple-400/60 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-60 right-1/4 h-1 w-1 rounded-full bg-blue-300/60 animate-pulse animation-delay-3000"></div>
        <div className="absolute bottom-60 right-2/3 h-1.5 w-1.5 rounded-full bg-violet-400/60 animate-pulse animation-delay-1500"></div>

        <div className="absolute top-1/4 left-0 h-px w-32 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-line-move"></div>
        <div className="absolute top-2/3 right-0 h-px w-40 bg-gradient-to-l from-transparent via-purple-500/50 to-transparent animate-line-move animation-delay-2000"></div>

        <div className="z-10 relative max-w-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-2xl"></div>

          <div className="relative rounded-3xl border border-slate-800/50 bg-slate-900/40 p-12 backdrop-blur-xl shadow-2xl">
            <div className="mb-8 inline-block animate-fade-in">
              <div className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
                  <span className="text-sm font-medium text-blue-300">
                    Enterprise Ready
                  </span>
                </div>
              </div>
            </div>

            <h2 className="mb-4 text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-fade-in animation-delay-300">
              Fix Board
            </h2>

            <p className="mb-8 text-2xl text-slate-300 animate-fade-in animation-delay-500">
              Organize. Collaborate. Succeed.
            </p>

            <div className="space-y-4 animate-fade-in animation-delay-700">
              <div className="flex items-center gap-3 group">
                <div className="rounded-lg bg-blue-500/10 p-2 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Real-time collaboration
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="rounded-lg bg-purple-500/10 p-2 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Enterprise-grade security
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="rounded-lg bg-cyan-500/10 p-2 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <svg
                    className="h-5 w-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Advanced analytics
                </span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-700/50 pt-8 animate-fade-in animation-delay-1000">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">10K+</p>
                <p className="text-sm text-slate-500 mt-1">Users</p>
              </div>
              <div className="text-center border-x border-slate-700/50">
                <p className="text-3xl font-bold text-white">99.9%</p>
                <p className="text-sm text-slate-500 mt-1">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-500 mt-1">Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
