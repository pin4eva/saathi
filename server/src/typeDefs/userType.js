import { gql } from "apollo-server-micro";

export default gql`
  type User {
    id: ID
    name: String
    email: String
    username: String
    token: String
    otp: String
    todos: [Todo]
  }

  extend type Query {
    getUsers: [User]
    verifyToken(otp:String,email:String): User!
    auth:User
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
