const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "user name already exists"],
        required: [true, "user name is require"]
    },
    email:{
        type:String,
        unique:[true, "Email already exists"],
        required:[true, "Emial is require"]
    },
    password:{
        type: String,
        required: [true, "Password is require"],
        select:false
    },
    bio:String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/tcidpbq78/profile.jpg?updatedAt=1770905080542"
    },

    //2000
    //id = 12 bytes

//     followers:[{
//  type: mongoose.Schema.Types.ObjectId,
//  ref: "users"
//     }],

//     //200
//     following:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "users"
//     }],

})



const userModel = mongoose.model("users" , userSchema)

module.exports= userModel;