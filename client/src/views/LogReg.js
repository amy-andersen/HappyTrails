import Login from "../components/Login";
import Register from "../components/Register";

const LogReg = (props) => {
    return (
        <div className="bg-login">
            <div className=" p-1">
                <h2 className="trail-font">Welcome to Happy Trails!</h2>
                <p className="font-weight-bold">We're so glad you're here. For the off the beaten path traveler to document all of the epic hikes they've been on! You can log your own hikes, and see others as well.</p>
            </div>
            <div>
                <div className="d-flex col-7 justify-content-around p-5">
                    <div className="col-5">
                    <Login/>
                    </div>
                    <div className="col-5 mb-5">
                    <Register/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogReg;