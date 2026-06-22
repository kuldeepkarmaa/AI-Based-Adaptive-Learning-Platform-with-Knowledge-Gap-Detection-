import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import "../../App.css";

const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    return (
        <div className="auth-page">
            <div className="login-card">
                {/* Logo */}
                <div className="auth-logo">
                    <div className="logo-box">
                        🧠
                    </div>
                    <h2>
                        Knowledge Guru
                    </h2>
                    <p>
                        Empowering your future with AI
                    </p>
                </div>

                {/* Role Dropdown */}
                <div className="input-group">
                    <label>
                        Select Role
                    </label>
                    <select>
                        <option>
                            Student
                        </option>
                        <option>
                            Teacher
                        </option>
                        <option>
                            Admin
                        </option>
                    </select>
                </div>

                {/* Email */}
                <div className="input-group">
                    <label>
                        Email Address
                    </label>
                    <div className="input-box">
                        <Mail size={18}/>
                        <input
                            type="email"
                            placeholder="name@company.com"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="input-group">
                    <label>
                        Password
                    </label>
                    <div className="input-box">
                        <Lock size={18}/>
                        <input
                           type={
                                showPassword
                                ? "text"
                                :"password"
                            }
                            placeholder="********"
                        />
                        <span
                        onClick={()=>
                        setShowPassword(!showPassword)
                        }
                        >
                        {
                        showPassword
                        ?
                        <EyeOff size={18}/>
                        :
                        <Eye size={18}/>
                        }
                        </span>
                    </div>
                </div>
                <div className="forgot-row">
                    <label>
                        <input type="checkbox"/>
                        Remember me for 30 days
                    </label>
                    <a href="/forgot-password">
                        Forgot password?
                    </a>
                </div>
                <button className="login-btn">
                    Login
                </button>
                <div className="or">
                    <span></span>
                    OR
                    <span></span>
                </div>
                <button className="google-btn">
                    🌐
                    Sign in with Google
                </button>
                <p className="register-text">
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}


export default Login;
