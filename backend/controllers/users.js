const Auth = require("../models/auth.model");

exports.getAllUsers = async (req, res) => {
    const { uid } = req.user;

    try {
        const isUser = await Auth.findOne({ uid: uid });

        if (!isUser) {
            return res.status(401).json({ message: "User not found" });
        }

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn,
                imageURL: isUser.imageURL,
            },
            message: "User retrieved successfully",
        });
    } catch (error) {
        return res.sendStatus(500);
    }
}

exports.postSigninUsers = async (req, res) => {
    const { uid, fullName, email } = req.body;

    try {
        let isUser = await Auth.findOne({ uid });

        if (isUser) {
            return res.json({ error: true, message: "User already exists" });
        }


        isUser = new Auth({
            uid,
            fullName,
            email,
            imageURL: req.user.picture,
        });

        await isUser.save();

        return res.json({
            error: false,
            isUser,
            message: "Registration Successful",
        });
    } catch (error) {
        const userAuthInfo = await Auth.findOne({ email });

        if (!userAuthInfo) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        return res.json({
            error: false,
            email: userAuthInfo.email,
            message: "Login successfully",
        });
    }
}