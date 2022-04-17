import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"

const AllTrails = (props) => {

    const [trailList, setTrailList] = useState([]);
    const [user, setUser] = useState([]);

    const navigate = useNavigate();

    //get all the trails
    useEffect(() => {
        axios.get("http://localhost:8000/api/trails")
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setTrailList(res.data);
        })
        .catch((err) => console.log(err))
    }, [])

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

    return (
        <div className="bg-home">
            <nav className="navbar bg-light bg-opacity-25">
                <div className="container-fluid">
                    <div>
                        <p className="trail-font-nav">Happy Trails</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link className="text-decoration-none text-dark fs-5 border-end border-dark pe-2" to={`/profile/${user.username}`}>Profile</Link>
                        <button className="btn btn-link text-decoration-none text-dark fs-5" onClick={logout}>Log Out</button>
                    </div>
                </div>
            </nav>
            <Link className="btn btn-success fs-5 mt-2" to={"/new"}>Add New Hike</Link>
            <div className="d-flex flex-wrap justify-content-around">
            {
                trailList.map((trail, index) => (
                    <div className="card col-3 m-4 p-2 bg-light bg-opacity-75" key={trail._id}>
                        <div className="border-bottom border-secondary mb-2">
                            <h4 className="card-title">{trail.title}</h4>
                        </div>
                        <p className="fs-5">Hike Created By: <Link className="text-dark" to={`/profile/${trail.createdBy.username}`}>{trail.createdBy.username}</Link></p>
                        <p className="fs-5">Location: {trail.location}</p>
                        <p className="fs-5">Difficulty: {trail.difficulty}</p>
                        <p className="fs-5">Distance: {trail.distance} miles</p>
                        {
                            trail.dogFriendly === true?
                                <p className="fs-5">Dog Friendly!</p>
                            : null
                        }
                        {
                            trail.notes?
                            <p className="fs-6">Notes: {trail.notes}</p>
                            : null
                        }
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default AllTrails;