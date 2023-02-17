import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs = require("fs");
import path = require("path");

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  //   resolvers,
});

const url = async () => {
  startStandaloneServer(server, {
    listen: { port: 4000 },
  });
};

console.log(`Server ready at: ${url}`);
