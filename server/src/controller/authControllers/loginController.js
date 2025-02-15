const loginModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginModel.findOne({ email });
        if (!user) {
            throw new Error("no user exist");
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new Error("incorrect password");
        }
        const token = await jwt.sign({email}, process.env.JWT_SCERET, {expiresIn: "1h"});

        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        if (err.message === "no user exist") {
            res.status(404).json({ message: "User not found" });
        } else if (err.message === "incorrect password") {
            res.status(401).json({ message: "Invalid credentials" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

module.exports = loginController;
