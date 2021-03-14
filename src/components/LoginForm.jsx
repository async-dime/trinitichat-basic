import { useState } from "react";
import axios from "axios";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const isInvalid = password === "" || username === "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {
            "Project-ID": "d1bfb692-bb7b-42ad-91e3-285fc57373bf",
            "User-Name": username,
            "User-Secret": password,
        };

        try {
            await axios.get("https://api.chatengine.io/chats", {
                headers: authObject,
            });
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
            window.location.reload();
        } catch (error) {
            setError('Please enter the correct credential')
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">TrinitiChat</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input"
                        placeholder="Username"
                        required
                    />
                    <div
                        style={{
                            position: "relative",
                            display: "flex",
                        }}
                    >
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="Password"
                            required
                        />
                        <i
                            onClick={togglePasswordVisibility}
                            style={{
                                position: "absolute",
                                top: "30%",
                                right: "10%",
                                cursor: "pointer",
                            }}
                        >
                            {showPassword ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </i>
                    </div>
                    <div align="center">
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`button ${
                                isInvalid && "invalid-button"
                            }`}
                        >
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'>{error}</h2>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
