import jwt from "jsonwebtoken";
// eslint-disable-next-line @typescript-eslint/ban-types
export function getUserId(authHeader) {
    const token = authHeader.replace("Bearer", "");
    if (!token) {
        throw new Error("No token found");
    }
    return jwt.verify(token, process.env.APP_SECRET);
}
