import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs = require("fs");
import path = require("path");

import Query from "";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  //   resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
    };
  },
});

const url = async () => {
  startStandaloneServer(server, {
    listen: { port: 4000 },
  });
};

console.log(`Server ready at: ${url}`);

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
