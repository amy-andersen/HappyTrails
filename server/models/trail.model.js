const mongoose = require('mongoose');

//new mongoose schema to shape the data
const TrailSchema = new mongoose.Schema({

    title: {
        type: String,
        //validators
        required: [true, "A title is required"],
        minlength: [3, "The title's length must be at least 3 characters"]
    },
    location: {
        type: String,
        //validators
        required: [true, "A location is required"]
    },
    difficulty: {
        type: String,
        enum: [
            "Easy",
            "Medium",
            "Difficult"
        ]
    },
    distance: {
        type: Number,
        required: [true, "A distance is required"]
    },
    notes: {
        type: String
    },
    completed:{
        type: Boolean
    },
    dogFriendly:{
        type: Boolean
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
    //use timestamps to get createdAt and updatedAt for each document
}, {timestamps: true})

//model takes in collection name (which will become lowercase plural) and schema
const Trail = mongoose.model("Trail",TrailSchema);

//export model to be imported in controller
module.exports = Trail;