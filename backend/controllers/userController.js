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

            res.cookie("jwt", token, { httpOnly: true });

            return res.status(201).json({ status:201, userName:user.userName});

        }
    } catch (error) {
        console.log(error)
        if (error.code) return res.status(error.code).json({status: error.code, error: error.error})
        return res.status(500).json({status: 500, error: "Internal Server Error"})
    }
};

module.exports = {
    register
};