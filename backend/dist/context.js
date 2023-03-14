import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
// import { JwtPayload } from "jsonwebtoken";
export const prisma = new PrismaClient();
export const context = ({ req }) => {
    const auth = req.headers.authorization;
    const token = req && auth ? getUserId(auth) : null;
    return {
        ...req,
        prisma,
        userId: token?.userId,
    };
};
