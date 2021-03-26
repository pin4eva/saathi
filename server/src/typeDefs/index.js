import { makeExecutableSchema, gql } from "apollo-server-micro";
import todoType from "./todoType";
import resolvers from "../resolvers";
import userType from "./userType";

const typeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, todoType, userType],
  resolvers,
});
