// import { ApolloServer } from "apollo-server-micro";
// import http from "http";
// import { schema } from "./typeDefs";

// const apolloServer = new ApolloServer({
//   schema,
//   context: async ({ req, res }) => {
//     let token = "";
//     if (req.headers) token = req.headers.authorization;
//     return {
//       req,
//       res,
//       token,
//     };
//   },
// });

// const handler = apolloServer.createHandler({
//   path: "/graphql", cors: {
//   origin: ["http://localhost:3000"]
// } });
// const server = new http.Server(handler);

// server.listen(8000, () => {
//   console.log("server started");
// });



import { ApolloServer } from "apollo-server-express";
import http from "http";
import { schema } from "./typeDefs";
import express from "express";
import cors from "cors"

const app = express()

// app.use(cors(
// 	{
// 		origin: ["http://localhost:3000"],
// 		credentials: true
// }
// ))
const server = new ApolloServer({
	schema,
	context: async ({ req, res }) => {
		const { authorization } = req.headers;

		return {
			res,
			req,
			token: authorization,
		};
	},
	introspection: true,
	playground: true,
});

server.applyMiddleware({
	app,
	path: "/api/graphql",
	cors: {
		origin: ["http://localhost:3000"],
		credentials: true,
	},
});

app.listen(8000, () => {
  console.log("server started");
});

