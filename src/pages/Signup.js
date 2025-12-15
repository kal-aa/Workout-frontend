import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { signup, isLoading, error } = useSignup();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign up</h3>

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
        {isLoading ? "Signing up..." : "Sign up"}
      </button>
      <span> or </span>
      <Link to="/login">Already have an account</Link>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
