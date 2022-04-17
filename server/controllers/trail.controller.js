const Trail = require("../models/trail.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

    module.exports = {
        findAllTrails: (req, res)=>{
            Trail.find()
                .populate("createdBy", "username email")
                .then((allTrails)=>{
                    console.log(allTrails);
                    res.json(allTrails);
                })
                .catch((err)=>{
                    console.log("findAllTrails has failed!");
                    res.json({ message: "Something went wrong in findAll", error: err })
                })
        },
        createNewTrail: (req, res)=>{
            const newTrailObject = new Trail(req.body);
            const decodedJWT = jwt.decode(req.cookies.usertoken,{
                complete:true
            })
            newTrailObject.createdBy = decodedJWT.payload.id;
            newTrailObject.save()
                .then((newTrail)=>{
                    console.log(newTrail);
                    res.json(newTrail);
                })
                .catch((err)=>{
                    console.log("Something went wrong in createNewTrail");
                    res.status(400).json(err)
                })
        },
        findOneTrail: (req, res)=>{
            Trail.findOne({ _id: req.params.id })
                .then((oneTrail)=>{
                    console.log(oneTrail);
                    res.json(oneTrail);
                })
                .catch((err)=>{
                    console.log("Find One Trail failed");
                    res.json({ message: "Something went wrong in findOneTrail", error: err })
                })
        },
        deleteOneTrail: (req, res)=>{
            Trail.deleteOne({_id: req.params.id})
                .then((deletedTrail)=>{
                    console.log(deletedTrail);
                    res.json(deletedTrail);
                })
                .catch((err)=>{
                    console.log("delete One Trail failed");
                    res.json({ message: "Something went wrong in deleteOneTrail", error: err })
                })
        },
        updateTrail: (req, res)=>{
            //This Mongoose query requires both a parameter and body from request
            Trail.findOneAndUpdate({_id: req.params.id},
                req.body,
                {new: true, runValidators: true}
                )
                .then((updatedTrail)=>{
                    console.log(updatedTrail)
                    res.json(updatedTrail)
                })
                .catch((err)=>{
                    console.log("Something went wrong in updateTrail");
                    res.status(400).json(err) 
                })
        },
        findAllCompletedTrailsByUser: (req, res)=>{
            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");
                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn)=>{
                        Trail.find({createdBy: userNotLoggedIn._id, completed: true})
                            .populate("createdBy", "username")
                            .then((allTrailsFromUser)=>{
                                console.log(allTrailsFromUser);
                                res.json(allTrailsFromUser);
                            })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Trail.find({ createdBy: req.jwtpayload.id, completed: true})
                    .populate("createdBy", "username")
                    .then((allTrailsFromLoggedInUser) => {
                        console.log(allTrailsFromLoggedInUser);
                        res.json(allTrailsFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
        },
        findAllIncompleteTrailsByUser: (req, res)=>{
            if(req.jwtpayload.username !== req.params.username){
                console.log("not the user");
                User.findOne({username: req.params.username})
                    .then((userNotLoggedIn)=>{
                        Trail.find({createdBy: userNotLoggedIn._id, completed: false})
                            .populate("createdBy", "username")
                            .then((allTrailsFromUser)=>{
                                console.log(allTrailsFromUser);
                                res.json(allTrailsFromUser);
                            })
                    })
                    .catch((err)=>{
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
            else{
                console.log("current user")
                console.log("req.jwtpayload.id:", req.jwtpayload.id);
                Trail.find({ createdBy: req.jwtpayload.id , completed: false})
                    .populate("createdBy", "username")
                    .then((allTrailsFromLoggedInUser) => {
                        console.log(allTrailsFromLoggedInUser);
                        res.json(allTrailsFromLoggedInUser);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(400).json(err);
                    })
            }
        }
    }