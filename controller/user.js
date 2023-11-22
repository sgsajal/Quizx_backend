const User =require("../models/user");

const getUser = async (req, res, next) => {
    let resp;

    try {
        const userId = req.params.userId;
        console.log(userId);
        if (req.userId != req.params.userId) {
            const err = new Error("You are not authorized!");
            err.statusCode = 401;
            err.data = { hi: "its error" };
            throw err;
        }
        const user = await User.findById(userId, { firstname: 1,lastname:1, email: 1 ,password:1});
        if (!user) {
            const err = new Error("No user exist");
            err.statusCode = 401;
            throw err;
        } else {
            resp = { status: "success", message: "User found", data: user };
            res.status(200).send(resp);
        }
    } catch (error) {
        next(error);
    }

}

const updateUser = async (req, res, next) => {

    let resp
    try {
        console.log("error 1");
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            const err = new Error("No user exist");
            err.statusCode = 401;
            throw err;
        }
        console.log("error 2");
        user.firstname = req.body.firstname||user.firstname;
        user.lastname = req.body.lastname||user.lastname;
        user.email=req.body.email||user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        console.log("error 3");
        await user.save();
        console.log("error 4");
        resp = { status: "success", message: "User Updated", data: {} };
        res.send(resp);
    } catch (error) {
        next(error);
    }
}


module.exports={getUser,updateUser};