import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = (props) => {
    const [enteredCode, setEnteredCode] = useState("");
    const [vonageCode, setVonageCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();



    //get logged in user's phone number
    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data.phone);
                setPhone(res.data.phone);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    //send 2fa code to user's phone 
    const sendCode = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/sendcodesms",
                {
                    phone: phone
                },
                {
                    withCredentials: true
                }
            )
            .then((res) => {
                console.log("vonage code passed to front end:")
                console.log(res.data.request_id);
                setVonageCode(res.data.request_id);
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                console.log(err.response.data);
            });
    }

    //verify's users code 
    const verify = (event) => {
        event.preventDefault();
        axios
            .post(
                "http://localhost:8000/api/users/verify",
                {
                    enteredCode: enteredCode,
                    vonageCode: vonageCode
                },
                {
                    withCredentials: true
                }
            )
            .then((res) => {
                console.log("front end status is:")
                console.log(res.data.status)
                if(res.data.status === "0"){
                    console.log("codes matched, you're in!");
                    navigate("/home");
                }
                else{
                    setErrorMessage("Invalid Attempt")
                }
            })
            .catch((err) => {
                setErrorMessage(err.response.data.message);
                console.log(err.response.data);
            });
    }

    //post request to logout
    const logout = (e) => {
        axios.post("http://localhost:8000/api/users/logout",
                {}, //required to send something with post request
                {
                    withCredentials: true,
                },
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="bg-login d-flex flex-wrap justify-content-center">
            <nav className="navbar bg-light bg-opacity-50 col-12 mb-5">
                <div className="container-fluid text-light">
                    <div>
                        <p className="trail-font-nav">Happy Trails</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-link text-decoration-none text-dark font-weight-bold fs-5" onClick={logout}>Log Out</button>
                    </div>
                </div>
            </nav>
            <div className=" col-7 d-flex flex-wrap justify-content-center bg-secondary bg-opacity-75 p-5 my-5 rounded">
                <div className="col-12">
                    <p className="fw-bold">One more step and you're there! Please verify your phone number.</p>
                    <button className="btn btn-success my-4" onClick={sendCode}>Send code to phone on file </button>
                    <p className="text-warning">{errorMessage ? errorMessage : ""}</p>
                </div>
                <form onSubmit={verify} className="col-4">
                    <div className="form-group">
                        <input type="number" className="form-control" name="enteredCode" placeholder="Enter verification code" value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)}/>
                    </div>
                    <div className="center">
                        <button className="btn btn-success my-4">Verify</button>
                    </div>
                </form>
            </div>
            <div className="p-5 m-3 col-12 "></div>
        </div>
    )
};

export default Verify;