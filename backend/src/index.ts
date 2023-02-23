import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server";
// import { startStandaloneServer } from "@apollo/server/standalone";
import fs = require("fs");
import path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allUsers: () => {
      return prisma.user.findMany();
    },
  },
};
console.log(__dirname);

const runServer = () => {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
    resolvers,
    context: () => {
      return {
        prisma,
      };
    },
  });

  const port = 4000;
  server.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
};

runServer();
