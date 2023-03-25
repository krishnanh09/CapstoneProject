const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("")[1];
        const decodedToken = jwt.verify(token, "sfdhsdjakfdfdskjfahfjdshjkfshf");
        req.userData = {email:decodedToken.email, id:decodedToken.userId, userType:decodedToken.userType};
        next();
    } catch (err){
        res.status(401).json({message:"Not Authorized!!!"});
    }
    
    
}