import React, {useState, useEffect} from "react";
import  {useParams, Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Profile = (props)=>{

    const [user, setUser] = useState([]);
    const {username} = useParams();
    const [completedHikes, setCompletedHikes] = useState([]);
    const [incompleteHikes, setIncompleteHikes] = useState([]);
    const [totalMiles, setTotalMiles] = useState(0);

    const navigate = useNavigate();

    //get logged in user
    useEffect(() => {
        axios.get("http://localhost:8000/api/users",
            { withCredentials: true }
        )
            .then((res) => {
                // console.log(res.data);
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
                // console.log(res);
                // console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const mileCount = () =>{
        let count = 0
        for(let i=0;i<completedHikes.length;i++){
            console.log("*******************"+completedHikes[i])
            let test = completedHikes[i]
            console.log(test)
            count += (test.distance)
            console.log(count)
        }

        setTotalMiles(count)
    }


    //get list of completed hikes
    useEffect(()=>{
        // setTotalMiles(0);
        axios.get(`http://localhost:8000/api/completedtrailsbyuser/${username}`,
            { withCredentials: true }
        )
            .then((res)=>{
                // console.log(res.data);
                setCompletedHikes(res.data);
                mileCount()

                // console.log(totalMiles)
                // if(totalMiles===0){
                    // let count = 0
                    // for(let i=0;i<completedHikes.length;i++){
                    //     console.log("*******************"+completedHikes[i])
                    //     let test = completedHikes[i]
                    //     console.log(test)
                    //     count += (test.distance)
                    //     console.log(count)
                    // }
                    //     setTotalMiles(count)
                // else{console.log("hikes already counted")}
                }
                
                // setTotalMiles(0)
                // completedHikes.map((trail, index) => (
                //     console.log("***********************************************************************"+trail.distance)
                    // setTotalMiles(totalMiles += trail.distance)
                // ))
            )
            .catch((err)=>{
                console.log(err)
            })
    }, [username])




    //get list of incompleted hikes
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/incompletetrailsbyuser/${username}`,
            { withCredentials: true }
        )
            .then((res)=>{
                // console.log(res.data);
                setIncompleteHikes(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])

    return(
        <div className="bg-home">
            <nav className="navbar bg-light bg-opacity-25">
                <div className="container-fluid">
                        <div>
                            <p className="trail-font-nav">Happy Trails</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <Link className="text-decoration-none text-dark fs-5 border-end border-dark pe-2" to={"/home"}>Home</Link>
                            <button className="btn btn-link text-decoration-none text-dark fs-5" onClick={logout}>Log Out</button>
                        </div>
                    </div>
            </nav>
            {
                username === user.username ?
                    <h1>Welcome, {username}!</h1>
                    : <h2>{username}'s Hikes</h2>
            }
            <h3>Total Miles Hiked: {totalMiles}</h3>
            <Link className="btn btn-success fs-5 mt-2" to={"/new"}>Add New Hike</Link>
            <div className="d-flex justify-content-around">
                <div className="col-5 d-inline">
                    <h3 className="text-center text-light">Adventure List</h3>
                    {
                    incompleteHikes.map((trail, index) => (
                        <div className="card col-10 m-4 p-2 bg-light bg-opacity-75" key={index}>
                            <div className="border-bottom border-secondary mb-2">
                                <h4 className="card-title">{trail.title}</h4>
                            </div>
                            <p className="fs-5">Location: {trail.location}</p>
                            <p className="fs-5">Difficulty: {trail.difficulty}</p>
                            <p className="fs-5">Distance: {trail.distance}</p>
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
                            {
                            username === user.username ?
                                <Link className="btn btn-secondary" to={`/edit/${trail._id}`}>Edit</Link>
                                : null
                            }
                        </div>
                    ))
                    }
                </div>
                <div className="col-5 d-inline">
                    <h3 className="text-center text-light">Completed Hikes</h3>
                    {
                    completedHikes.map((trail, index) => (
                        <div className="card col-10 m-4 p-2 bg-light bg-opacity-75" key={index}>
                            <div className="border-bottom border-secondary mb-2">
                                <h4 className="card-title">{trail.title}</h4>
                            </div>
                            <p className="fs-5">Location: {trail.location}</p>
                            <p className="fs-5">Difficulty: {trail.difficulty}</p>
                            <p className="fs-5">Distance: {trail.distance}</p>
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
                            {
                            username === user.username ?
                                <Link className="btn btn-secondary" to={`/edit/${trail._id}`}>Edit</Link>
                                : null
                            }
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}



export default Profile;