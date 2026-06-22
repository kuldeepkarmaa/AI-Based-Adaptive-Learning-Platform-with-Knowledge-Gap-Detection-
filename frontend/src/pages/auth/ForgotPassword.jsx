import React from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import front from "../../assests/images/front.png";

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-purple-50">
            <div className="w-[390px] bg-white p-[35px] rounded-[18px] shadow-[0_20px_50px_rgba(124,58,237,0.12)]">
                <div className="text-center mb-6">
                    <div className="w-[45px] h-[45px] mx-auto text-white rounded-xl flex items-center justify-center text-[22px] text-on-primary shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-1 active:scale-95">
                        <img src={front} alt="logo" />
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-gray-800">Forgot Password?</h2>
                    <p className="text-[13px] text-gray-500">Enter your email to reset password</p>
                </div>

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

                <button className="w-full py-[13px] bg-[#5b4bdb] hover:bg-[#4c3ec7] text-white rounded-lg font-semibold text-[15px] transition-colors duration-200">
                    Send Reset Link
                </button>

                <p className="text-center mt-6 text-[13px] text-gray-700">
                    Remember password?
                    <Link to="/login" className="text-purple-600 font-semibold ml-1 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;