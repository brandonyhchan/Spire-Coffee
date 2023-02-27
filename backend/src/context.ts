import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";


export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
    userId: string | JwtPayload | null;
}

export const context = ({ req }: { req: Request }): Context => {
    return {
        ...req,
        prisma,
        userId: req && req.headers.authorization ? getUserId(req) : null,
    };
};