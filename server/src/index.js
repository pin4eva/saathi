import { ApolloServer } from "apollo-server-micro";
import http from "http";
import { schema } from "./typeDefs";

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    let token = "";
    if (req.headers) token = req.headers.authorization;
    return {
      req,
      res,
      token,
    };
  },
});

const handler = apolloServer.createHandler({ path: "/graphql" });
const server = new http.Server(handler);

server.listen(8000, () => {
  console.log("server started");
});
