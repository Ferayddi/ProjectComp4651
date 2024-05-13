const jwt = require("jsonwebtoken");
const db = require('../models/index')
const User = require('../models/user');


const validateNewUser = async (req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });

        if (username) {
            return res.status(409).json({code: 409, error: "The username already taken"})
        }

        const emailCheck = await User.findOne({
            where: {
                userEmail: req.body.userEmail,
            },
        });

        if (emailCheck) {
            return res.status(409).json({code: 409, error: "This Email already registered"})
        }

        next();
    } catch (error) {
        if (error.code) res.status(error.code).json({status: error.code, error: error.error})
        else res.status(500).json({status: 500, error: error.message})
    }
}


const verifyToken  = async (req, res, next) => {
    try {
        let accessToken = req.headers.authorization
        if (!accessToken || accessToken.split(' ')[0] !== 'Bearer')
            return res.status(401).json({status: 401, error: "No token provided"})
        accessToken = accessToken.split(' ')[1]
        const verify = jwt.verify(accessToken, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                throw new Error(error.message)
            }
            return decoded
        })

        if (verify === "token expired") {
            return res.status(401).json({code: 401, error: "Token expired"})
        }

        res.username = verify.username

        next()
    } catch (error) {
        if (error.code) res.status(error.code).json({status: error.code, error: error.error})
        else res.status(500).json({status: 500, error: error.message})
    }
}

module.exports = {verifyToken, validateNewUser}