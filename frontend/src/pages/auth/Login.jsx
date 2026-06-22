import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import front from "../../assests/images/front.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-purple-50">
            <div className="w-[390px] bg-white p-[35px] rounded-[18px] shadow-[0_20px_50px_rgba(124,58,237,0.12)]">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="w-[45px] h-[45px] mx-auto text-white rounded-xl flex items-center justify-center text-[22px] text-on-primary shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-1 active:scale-95">
                        <img src={front} alt="logo" />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-gray-800">Knowledge Guru</h2>
                    <p className="text-[13px] text-gray-500">Empowering your future with AI</p>
                </div>

                {/* Role Dropdown */}
                <div className="mb-[18px]">
                    <label className="block text-[13px] mb-2 text-gray-700">Select Role</label>
                    <select className="w-full px-3 py-3 border border-purple-200 rounded-lg outline-none bg-white text-gray-700 text-sm cursor-pointer">
                        <option>Student</option>
                        <option>Teacher</option>
                        <option>Admin</option>
                    </select>
                </div>

                {/* Email */}
                <div className="mb-[18px]">
                    <label className="block text-[13px] mb-2 text-gray-700">Email Address</label>
                    <div className="flex items-center gap-2.5 border border-purple-200 px-3 py-3 rounded-lg">
                        <Mail size={18} className="text-gray-400 shrink-0" />
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-[18px]">
                    <label className="block text-[13px] mb-2 text-gray-700">Password</label>
                    <div className="flex items-center gap-2.5 border border-purple-200 px-3 py-3 rounded-lg">
                        <Lock size={18} className="text-gray-400 shrink-0" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            className="border-none outline-none w-full text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer flex items-center text-gray-500"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>

                {/* Forgot Row */}
                <div className="flex justify-between items-center text-xs mb-5">
                    <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
                        <input type="checkbox" />
                        Remember me for 30 days
                    </label>
                    <a href="/forgot-password" className="text-purple-600 hover:underline">Forgot password?</a>
                </div>

                <button className="w-full py-[13px] bg-[#5b4bdb] hover:bg-[#4c3ec7] text-white rounded-lg font-semibold text-[15px] transition-colors duration-200">
                    Login
                </button>

                <div className="flex items-center gap-2.5 justify-center my-5 text-xs text-gray-400">
                    <span className="h-px bg-gray-200 flex-1"></span>
                    OR
                    <span className="h-px bg-gray-200 flex-1"></span>
                </div>

                <button className="w-full py-3 bg-white border border-purple-200 rounded-lg text-sm text-gray-700 flex items-center justify-center gap-2 hover:bg-purple-50 transition-colors duration-200">
                    🌐 Sign in with Google
                </button>

                <p className="text-center mt-6 text-[13px] text-gray-700">
                    Don't have an account?
                    <Link to="/register" className="text-purple-600 font-semibold ml-1 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;