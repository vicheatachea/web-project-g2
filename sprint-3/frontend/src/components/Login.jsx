import React, {useState} from "react";
import './Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="USERNAME"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="PASSWORD"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">
                        LOG IN →
                    </button>
                </form>
                <div className="link-container">
                    <p>
                        Don't have an account already?{" "}
                        <a href="/signup" className="link">
                            Click here to sign up
                        </a>
                    </p>
                    <p>
                        <a href="/forgot-password" className="link">
                            Forgot your password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
