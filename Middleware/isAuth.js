const jwt =require("jsonwebtoken");


const isAuthenticated = async ( req,res, next) => {
  try {
    const secretKey = 'secretKey' || "";
    
    //header->token
    const authHeader = req.get("Authorization");
    // console.log(authHeader)
    if (!authHeader) {
      const err = new ProjectError("Not authenticated");
      err.statusCode = 401;
      throw err;
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, secretKey);
    } catch (error) {
      const err = new Error("Not authenticated");
      err.statusCode = 401;
      throw err;
    }

    if (!decodedToken) {
      const err = new Error("Not authenticated");
      err.statusCode = 401;
      throw err;
    }

    req.userId = decodedToken.userId;
    console.log("auth dome On submission");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports={ isAuthenticated };