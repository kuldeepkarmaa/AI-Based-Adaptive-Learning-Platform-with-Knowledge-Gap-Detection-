import React from "react";
import {Mail} from "lucide-react";
import {Link} from "react-router-dom";
import "../../App.css";

const ForgotPassword =()=>{
return(
<div className="auth-page">
<div className="login-card">
<div className="auth-logo">
<div className="logo-box">
🧠
</div>
<h2>
Forgot Password?
</h2>
<p>
Enter your email to reset password
</p>
</div>

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
<button className="login-btn">
Send Reset Link
</button>
<p className="register-text">
Remember password?
<Link to="/login">
Login
</Link>
</p>
</div>
</div>
)
}

export default ForgotPassword;
