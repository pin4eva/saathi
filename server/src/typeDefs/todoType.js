import { gql } from "apollo-server-micro";

export default gql`
  type Todo {
    id: ID
    title: String
    body: String
    completed: Boolean
  }

  extend type Query {
    getTodos: [Todo]!
  }
  extend type Mutation {
    addTodo(title: String, body: String): Todo!
    deleteTodo(id: ID): Boolean
    updateTodo(id: ID, title: String, body: String): Todo
    markCompleted(id: ID): Boolean
    deleteAllTodos: Boolean
  }
`;
