const admin = require("./firebase");

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send("Unauthorized from server");
    }
};

module.exports = {
    authenticateToken,
};