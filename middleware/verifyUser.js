import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "unauthorized access",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Only admin has access",
                });
            }
            req.email = decoded?.email;
            next();
        });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
};
