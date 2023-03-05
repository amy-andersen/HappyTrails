const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters"]
    },

    email: {
        type: String,
        required: [true, "Email address is required"]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Passwords must be at least 8 characters"]
    },
    phone: {
        type: Number,
        required: [true, "A phone number is required for 2FA"],
        min: [999999999, "Number must be 10 digits"],
        max: [10000000000, "Number must be 10 digits"]
    }
    // traillist: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Trail"
    //     }
    // ]
},{timestamps: true})

//Virtual field
    //stores info from our req, but will not be saved to the db
    UserSchema.virtual("confirmPassword")
        .get(()=>this._confirmPassword)
        .set((value)=>this._confirmPassword = value)

//pre validate automatically runs before any save middleware ... makes this go before the next one
UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Passwords must match!")
        console.log("Passwords don't match!")
    }
    next()
})

UserSchema.pre("save", function(next){
    console.log("in pre save");
        //hash the password BEFORE it's saved to the db
        bcrypt.hash(this.password, 10)
            .then((hashedPassword)=>{
                //give our password the value of the returned hash
                this.password = hashedPassword;
                next();
            })
})

const User = mongoose.model("User", UserSchema);

module.exports = User;