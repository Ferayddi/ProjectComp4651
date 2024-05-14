const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

const register = async (req, res) => {
    try {
        const { userName, userEmail, password } = req.body;
        const salt = await bcrypt.genSalt()
        const data = {
            userName,
            userEmail,
            password: await bcrypt.hash(password, salt),
        };

        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ userName: user.userName }, process.env.JWT_KEY);


            return res.status(201).json({ status:201, accessToken: token, userName:user.userName});

        }
    } catch (error) {
        if (error.code) return res.status(error.code).json({status: error.code, error: error.error})
        return res.status(500).json({status: 500, error: "Internal Server Error"})
    }
};

const login = async (req, res) => {
    try {
        const { userEmail, password } = req.body;
        const user = await User.findOne({
            where: {
                userEmail: userEmail
            }
        });

        if(!user){
            return res.status(404).json({ status: 404, error: "Cannot find this user"});
        }

        if (await bcrypt.compare(password, user.password)){
            const token = jwt.sign({ userName: user.userName }, process.env.JWT_KEY);

            return res.status(200).json({ status:200, accessToken: token, userName:user.userName});
        } else {
            return res.status(401).json({status: 401, error:"Incorrect password"})
        }

    } catch (error) {
        if (error.code) return res.status(error.code).json({status: error.code, error: error.error})
        return res.status(500).json({status: 500, error: "Internal Server Error"})
    }
};

module.exports = {
    register,
    login
};