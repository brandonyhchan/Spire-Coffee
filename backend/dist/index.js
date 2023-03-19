import { ApolloServer } from "apollo-server";
import { context } from "./context.js";
import { signUp, login } from "./resolvers/Query.js";
import { loadFile } from "graphql-import-files";
const resolvers = {
    Query: {
        signUp,
        login,
    },
};
const server = new ApolloServer({
    typeDefs: loadFile("./src/schemas/schema.graphql"),
    resolvers,
    context,
});
server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
