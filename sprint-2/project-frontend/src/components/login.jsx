import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ border: "1px solid #E5E5E5", padding: "40px", borderRadius: "10px", maxWidth: "400px", width: "100%" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #E5E5E5",
                backgroundColor: "#F5F5F5",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #E5E5E5",
                backgroundColor: "#F5F5F5",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "16px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            LOG IN →
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>
            Don't have an account already?{" "}
            <a href="/signup" style={{ color: "#635BFF" }}>
              Click here to sign up
            </a>
          </p>
          <p>
            <a href="/forgot-password" style={{ color: "#635BFF" }}>
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
