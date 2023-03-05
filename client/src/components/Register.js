import React, { useState } from 'react';
import axios from "axios";

const Register = (props) => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    //use a single state object to hold all data!
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    //function to update the state object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register",
            user,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for registering an account!",
                );
                setErrors({}); //reset errors state if it was successful
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div className="bg-secondary bg-opacity-75 p-3 rounded">
            <h1>Register</h1>
            {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
            <form onSubmit={register}>
                <div className="form-group">
                    <label className="text-light">Username</label>
                    <input type="text" className="form-control" name="username" value={user.username} placeholder="Choose a username" onChange={(e) => handleChange(e)}/>
                    {errors.username ?
                        <p className="text-warning">{errors.username.message}</p>
                        : null}
                </div>
                <div>
                    <label className="text-light">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} placeholder="Enter your email" onChange={handleChange}/>
                    {errors.email ?
                        <p className="text-warning">{errors.email.message}</p>
                        : null}
                </div>
                <div>
                    <label className="text-light">Phone Number</label>
                    <input type="number" className="form-control" name="phone" value={user.phone} placeholder="Enter 10-digit phone number" onChange={handleChange}/>
                    {errors.phone ?
                        <p className="text-warning">{errors.phone.message}</p>
                        : null}
                </div>
                <div>
                    <label className="text-light">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} placeholder="Password (8 character min)" onChange={handleChange}/>
                    {errors.password ? 
                        <p className="text-warning">{errors.password.message}</p>
                        : null}
                </div>
                <div>
                    <label className="text-light">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" value={user.confirmPassword} placeholder="Confirm password" onChange={handleChange}/>
                    {errors.confirmPassword ? 
                        <p className="text-warning">{errors.confirmPassword.message}</p>
                        : null}

                </div>
                <div className="center">
                    <button className="btn btn-success my-4">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;