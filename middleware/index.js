/////////////////////////////////////////////
//AUTH MIDDLEWARE
////////////////////////////////////////////
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.email = decoded.email
            next()
        })
    } else {
        res.status(400).json({ message: "Incorrect Token Given", isLoggedIn: false})
    }
}

module.exports={verifyJWT:verifyJWT}