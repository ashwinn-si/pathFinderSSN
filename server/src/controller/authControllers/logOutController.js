const logOutController = (req, res) => {
    res.clearCookie("jwtToken", {
        httpOnly: true,
        secure: true, // Make sure this matches how you set the cookie
        sameSite: "Strict" // or "Lax" depending on your needs
    });

    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = logOutController