import { validateToken } from "./token.js";

export async function checkAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
        return res.status(401).send("Unauthorized: Token not provided");
    }

    try {
        const userPayload = validateToken(token);
        req.user = userPayload;
        next();
    } catch (error) {
        console.error("JWT error:", error.message);
        return res.status(401).send("Invalid or expired token");
    }
}
