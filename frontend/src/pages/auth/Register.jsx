import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Mail,Lock,Eye,EyeOff,User} from "lucide-react";
import "../../App.css";

const Register =()=>{
const [showPassword,setShowPassword]=useState(false);
const [showConfirm,setShowConfirm]=useState(false);
return(
<div className="auth-page">
<div className="login-card">
<div className="auth-logo">
<div className="logo-box">
🧠
</div>
<h2>Knowledge Guru</h2>
<p>Where Ambition Meets Mastery</p>
</div>

{/* Role */}
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

{/* Name */}
<div className="input-group">
<label>
Full Name
</label>
<div className="input-box">
<User size={18}/>
<input
type="text"
placeholder="Enter your name"
/>
</div>
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
?
"text"
:
"password"
}
placeholder="********"
/>
<span
onClick={()=>setShowPassword(!showPassword)}
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

{/* Confirm Password */}
<div className="input-group">
<label>
Confirm Password
</label>
<div className="input-box">
<Lock size={18}/>
<input
type={
showConfirm
?
"text"
:
"password"
}
placeholder="********"

/>
<span
onClick={()=>setShowConfirm(!showConfirm)}
>
{
showConfirm
?
<EyeOff size={18}/>
:
<Eye size={18}/>
}
</span>
</div>
</div>

<button className="login-btn">
Create Account
</button>
<div className="or">
<span></span>
OR
<span></span>
</div>
<button className="google-btn">
🌐
Sign up with Google
</button>
<p className="register-text">
Already have an account?
<Link to="/login">
Login
</Link>
</p>
</div>
</div>
)
}

export default Register;
