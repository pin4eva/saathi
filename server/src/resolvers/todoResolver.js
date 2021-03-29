import { AWS_CONFIG, dynamo } from "../utils/config";
import { v4 as uuid } from "uuid";
import { authentication } from "../utils/authentication";

const params = {
  TableName: AWS_CONFIG.aws_table_item,
};

export default {
  Query: {
    getTodos: async () => {
      try {
        const data = await dynamo.scan(params).promise();

        return data.Items;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addTodo: async (_, { title, body }, { token }) => {
      const user = await authentication(token);
      if(!user) throw new Error("Invalid token provided")
      const params = {
        TableName: AWS_CONFIG.aws_table_item,
        Item: {
          id: uuid(),
          title,
          body,
          completed: false,
          userId: user.id
        },
      };
      const params2 = {
        TableName: AWS_CONFIG.aws_table_item,
        KeyConditionExpression: "id = :i",
        ExpressionAttributeValues: {
          ":i": params.Item.id,
        },
      };
      try {
        let todo = await dynamo.put(params).promise();

        todo = await dynamo
          .query(params2)
          .promise()
          .catch((err) => {
            console.log(err);
            throw Error(err);
          });

        return todo.Items[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTodo: async (_, { id, title, body }) => {
      try {
        const data = await dynamo
          .update({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { id },
            UpdateExpression: "set title = :n1,body = :n2",
            ExpressionAttributeValues: {
              ":n1": title,
              ":n2": body,
            },
            ReturnValues: "UPDATED_NEW",
          })
          .promise();

        return { ...data.Attributes, id };
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        const todo = await dynamo
          .delete({ TableName: AWS_CONFIG.aws_table_item, Key: { id } })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteAllTodos: async (_, { id }) => {
      try {
        const todo = await dynamo
          .delete({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { complete: null },
          })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    markCompleted: async (_, { id }) => {
      try {
        await dynamo
          .update({
            TableName: AWS_CONFIG.aws_table_item,
            Key: { id },
            UpdateExpression: "set completed = :n1",
            ExpressionAttributeValues: { ":n1": true },
          })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
