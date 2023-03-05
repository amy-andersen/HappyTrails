import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/login",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate("/verify");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div className="bg-secondary bg-opacity-75 p-3 rounded">
            <h1>Log In</h1>
            <p className="text-warning">{errorMessage ? errorMessage : ""}</p>
            <form onSubmit={login}>
                <div className="form-group">
                    <label className="text-light">Email</label>
                    <input type="text" className="form-control" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label className="text-light">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="center">
                    <button className="btn btn-success my-4">Log In</button>
                </div>
                <p className="text-light">Don't have an account? Register -{">"}</p>
            </form>
        </div>
    );
};

export default Login;