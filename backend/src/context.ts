import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
import { Request } from "express";
// import { JwtPayload } from "jsonwebtoken";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const auth = req.headers.authorization;

  const token = req && auth ? getUserId(auth) : null;

  return {
    ...req,
    prisma,
    userId: token?.userId,
  };
};
