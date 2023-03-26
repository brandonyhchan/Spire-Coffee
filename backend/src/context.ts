import { PrismaClient } from "@prisma/client";
import { getUserId } from "./utils.js";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const auth = req.headers.authorization?.split(" ")[1];

  const token = req && auth ? getUserId(auth) : null;

  return {
    prisma,
    userId: token?.userId,
  };
};
