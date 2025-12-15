import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin.js";

const Login = () => {
  const { login, isLoading, error } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>Log in</h3>

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      <span> or </span>
      <Link to="/signup">Don't have an account</Link>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
