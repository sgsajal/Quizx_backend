const mongoose =require ('mongoose');
const schema = mongoose.Schema;
//schema
const userSchema = new schema(
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);



const User = mongoose.model("User",userSchema);
//model
module.exports = User;
