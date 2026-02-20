
const Login = () => {
  return (
    <div className="login-container">
      
      {/* LEFT IMAGE */}
      <div className="login-image"></div>

      {/* RIGHT FORM */}
      <div className="login-form-wrapper">
        <div className="login-card">
          <h2>HYUNDAI CRM</h2>
          <h3>Welcome Back</h3>
          <p>Please login to your account</p>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button>Login</button>

          <div className="extra-links">
            <span>Forgot password?</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;