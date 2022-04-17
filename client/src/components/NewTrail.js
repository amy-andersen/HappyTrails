import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const NewTrail = (props) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [distance, setDistance] = useState("");
    const [notes, setNotes] = useState("");
    const [dogFriendly, setDogFriendly] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [user, setUser] = useState([]);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    //get logged in user
    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

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

    const submitHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/trails",
        {
            title,
            location,
            difficulty,
            distance,
            notes,
            dogFriendly,
            completed
        },
            { withCredentials: true }
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/home");
        })
        .catch((err)=>{
            console.log("err.response.data:", err.response.data);
            setErrors(err.response.data.errors);
            })
    }

    return (
        <div className="bg-new-edit">
            <nav className="navbar bg-light bg-opacity-25 mb-3">
                <div className="container-fluid text-light">
                        <div>
                            <p className="trail-font-nav">Happy Trails</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <Link className="text-decoration-none text-light fs-5 border-end border-light pe-2" to={"/home"}>Home</Link>
                            <Link className="text-decoration-none text-light fs-5 border-end border-light px-2" to={`/profile/${user.username}`}>Profile</Link>
                            <button className="btn btn-link text-decoration-none text-light fs-5" onClick={logout}>Log Out</button>
                        </div>
                    </div>
            </nav>
            <div>
                <form onSubmit={submitHandler} className="d-flex justify-content-end text-info">
                    <div className="form-group col-5 my-5 me-5 rounded bg-opacity-75 bg-secondary p-3">
                        <h2 className="text-light">Add a new hike</h2>
                        <label className="text-light">Title</label>
                        <input type="text" className="form-control" placeholder="Title" value={title} onChange = {(e)=>setTitle(e.target.value)}/>
                        {
                            errors.title ?
                                <p className="text-danger">{errors.title.message}</p>
                                : null
                        }
                        <label className="text-light mt-2">Location</label>
                        <input type="text" className="form-control" placeholder="Location (ex. Santa Barbara, CA)" value={location} onChange = {(e)=>setLocation(e.target.value)}/>
                        {
                            errors.location ?
                                <p className="text-danger">{errors.location.message}</p>
                                : null
                        }

                        <label className="text-light mt-2">Distance (miles)</label>
                        <input type="text" className="form-control" placeholder="0.0" value={distance} onChange = {(e)=>setDistance(e.target.value)}/>
                        {
                            errors.distance ?
                                <p className="text-danger">{errors.distance.message}</p>
                                : null
                        }
                        <label className="text-light mt-2">Notes (optional)</label>
                        <input type="text" style={{height:"100px"}} className="form-control" value={notes} onChange = {(e)=>setNotes(e.target.value)}/>
                        <label className="text-light mt-3 me-1">Difficulty</label>
                        <select value={difficulty} name="difficulty" onChange = {(e)=>setDifficulty(e.target.value)}>
                            <option defaultValue hidden>Select a Rating</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Difficult">Difficult</option>
                        </select>
                        <br></br>
                        <label className="text-light mt-3 me-1">Dog Friendly?</label>
                        <input type="checkbox" checked={dogFriendly} onChange = {(e)=>setDogFriendly(e.target.checked)}/>
                        <label className="text-light me-1 ms-4">Completed?</label>
                        <input type="checkbox" checked={completed} onChange = {(e)=>setCompleted(e.target.checked)}/>
                        <br></br>
                        <button className="btn btn-success mx-4 mt-4">Add Hike</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewTrail;