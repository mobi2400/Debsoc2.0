"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {
  ChevronLeft,
  User,
  Shield,
  Eye,
  EyeOff,
  Crown,
  Users,
  Settings,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {useAuth} from "@/contexts/AuthContext";
import {techHeadApi, presidentApi, cabinetApi, memberApi} from "@/lib/api";
import toast from "react-hot-toast";

type Role = "TechHead" | "President" | "cabinet" | "Member" | null;
type Mode = "login" | "register";

const LoginPage = () => {
  const router = useRouter();
  const {login} = useAuth();
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    position: "",
  });

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setFormData({email: "", password: "", name: "", position: ""});
    setShowPassword(false);
    setMode("login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (mode === "register") {
        if (selectedRole === "TechHead") {
          if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
          }
          response = await techHeadApi.register(
            formData.name,
            formData.email,
            formData.password
          );
        } else if (selectedRole === "President") {
          if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
          }
          response = await presidentApi.register(
            formData.name,
            formData.email,
            formData.password
          );
        } else if (selectedRole === "cabinet") {
          if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.position
          ) {
            toast.error("Please fill all fields including position");
            setLoading(false);
            return;
          }
          response = await cabinetApi.register(
            formData.name,
            formData.email,
            formData.password,
            formData.position
          );
        } else if (selectedRole === "Member") {
          if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
          }
          response = await memberApi.register(
            formData.name,
            formData.email,
            formData.password
          );
        } else {
          toast.error("Invalid role selected");
          setLoading(false);
          return;
        }
      } else {
        // Login
        if (!formData.email || !formData.password) {
          toast.error("Please fill all fields");
          setLoading(false);
          return;
        }
        if (selectedRole === "TechHead") {
          response = await techHeadApi.login(formData.email, formData.password);
        } else if (selectedRole === "President") {
          response = await presidentApi.login(
            formData.email,
            formData.password
          );
        } else if (selectedRole === "cabinet") {
          response = await cabinetApi.login(formData.email, formData.password);
        } else if (selectedRole === "Member") {
          response = await memberApi.login(formData.email, formData.password);
        } else {
          toast.error("Please select a role");
          setLoading(false);
          return;
        }
      }

      login(response.user, response.token);
      toast.success(response.message);

      // Redirect based on role
      if (response.user.role === "TechHead") {
        router.push("/dashboard/techhead");
      } else if (response.user.role === "President") {
        router.push("/dashboard/president");
      } else if (response.user.role === "cabinet") {
        router.push("/dashboard/cabinet");
      } else if (response.user.role === "Member") {
        router.push("/dashboard/member");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case "TechHead":
        return <Settings className="w-5 h-5" />;
      case "President":
        return <Crown className="w-5 h-5" />;
      case "cabinet":
        return <Users className="w-5 h-5" />;
      case "Member":
        return <User className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "TechHead":
        return "from-purple-500 to-purple-600";
      case "President":
        return "from-yellow-500 to-yellow-600";
      case "cabinet":
        return "from-blue-500 to-blue-600";
      case "Member":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  if (!selectedRole) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden pt-20">
          <div className="relative z-10 h-[calc(100vh-5rem)] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    SMVIT DEBSOC
                  </h1>
                  <p className="text-gray-400">Select your role to continue</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      role: "TechHead" as Role,
                      label: "Tech Head",
                      desc: "System Administrator",
                    },
                    {
                      role: "President" as Role,
                      label: "President",
                      desc: "Society Leader",
                    },
                    {
                      role: "cabinet" as Role,
                      label: "Cabinet",
                      desc: "Administrative Member",
                    },
                    {
                      role: "Member" as Role,
                      label: "Member",
                      desc: "Regular Member",
                    },
                  ].map(({role, label, desc}) => (
                    <button
                      key={role}
                      onClick={() => handleRoleSelect(role)}
                      className={`p-6 bg-gradient-to-br ${getRoleColor(
                        role
                      )} rounded-lg hover:scale-105 transition-all duration-200 text-white text-left group`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition">
                          {getRoleIcon(role)}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{label}</h3>
                          <p className="text-sm opacity-90">{desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden pt-20">
        <div className="relative z-10 h-[calc(100vh-5rem)] flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
              <div className="p-4 pb-3 text-center border-b border-gray-700/50">
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${getRoleColor(
                    selectedRole
                  )} rounded-full mb-2`}
                >
                  {getRoleIcon(selectedRole)}
                </div>
                <h1 className="text-lg font-bold text-white mb-1">
                  {selectedRole === "TechHead"
                    ? "Tech Head"
                    : selectedRole === "cabinet"
                    ? "Cabinet"
                    : selectedRole}
                </h1>
                <p className="text-gray-400 text-xs">
                  {mode === "login"
                    ? "Login to your account"
                    : "Create a new account"}
                </p>
              </div>

              <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === "register" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                        placeholder="Enter your name"
                        required={mode === "register"}
                      />
                    </div>
                  )}

                  {mode === "register" && selectedRole === "cabinet" && (
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Position
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                        placeholder="Enter your position"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-9 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 text-xs"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[28px] text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r ${getRoleColor(
                      selectedRole
                    )} hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading
                      ? "Processing..."
                      : mode === "login"
                      ? `Sign In as ${
                          selectedRole === "cabinet" ? "Cabinet" : selectedRole
                        }`
                      : `Register as ${
                          selectedRole === "cabinet" ? "Cabinet" : selectedRole
                        }`}
                  </button>
                </form>

                <div className="text-center pt-3 space-y-2">
                  <button
                    onClick={() => {
                      setMode(mode === "login" ? "register" : "login");
                      setFormData({
                        email: "",
                        password: "",
                        name: "",
                        position: "",
                      });
                    }}
                    className="text-orange-400 hover:text-orange-300 text-xs font-medium transition-colors duration-200 cursor-pointer"
                  >
                    {mode === "login"
                      ? "Don't have an account? Register"
                      : "Already have an account? Login"}
                  </button>
                  <div>
                    <button
                      onClick={() => {
                        setSelectedRole(null);
                        setFormData({
                          email: "",
                          password: "",
                          name: "",
                          position: "",
                        });
                        setMode("login");
                      }}
                      className="text-gray-400 hover:text-gray-300 text-xs font-medium transition-colors duration-200 flex items-center justify-center mx-auto group cursor-pointer"
                    >
                      <ChevronLeft
                        size={12}
                        className="mr-1 group-hover:-translate-x-1 transition-transform duration-200"
                      />
                      Back to role selection
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-4 pb-4">
                <p className="text-gray-500 text-xs">
                  © 2025 SMVIT DEBSOC. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
