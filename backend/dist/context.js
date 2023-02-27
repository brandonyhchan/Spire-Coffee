import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
export const prisma = new PrismaClient();
export const context = ({ req }) => {
    return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
    };
};
