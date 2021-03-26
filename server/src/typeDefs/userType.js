import { gql } from "apollo-server-micro";

export default gql`
  type User {
    id: ID
    name: String
    email: String
    username: String
    token: String
  }

  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    signup(input: UserInput): User
    login(email: String, password: String): User
    deleteUser(email: String): Boolean
  }

  input UserInput {
    name: String
    email: String
    username: String
    password: String
  }
`;
