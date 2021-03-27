import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { authentication } from "../utils/authentication";
import { config, dynamo } from "../utils/config";
const TableName = config.AWS_CONFIG.aws_table_user;

("use strict");

export default {
  Query: {
    getUsers: async () => {
      try {
        const users = await dynamo.scan({ TableName }).promise();

        return users.Items;
      } catch (error) {
        throw new Error(error);
      }
    },
    auth: async (_, args, { token }) => {
      let authUser = await authentication(token);
      if (!authUser) return null; 
      const user = await dynamo.get({
        TableName,
        Key:{email:authUser.email}
      }).promise()
      

      return user.Item
    },
    verifyToken: async (_, { otp,email }) => {
      try {
        let user = await dynamo.get({
          TableName,
          Key:{email}
        }).promise()

        if (otp !== user.Item.otp) throw new Error("Invalid token");

        user = await dynamo.update({
          TableName,
          Key: { email },
          UpdateExpression: "set otp = :n1",
          ExpressionAttributeValues: {
            ":n1":""
          },
          ReturnValues: "TOTAL"

        }).promise()
        
        return user.Item;
      } catch (error) {
        
      }
    }
  },
  Mutation: {
    signup: async (_, { input }) => {
      const { email, password, username, name } = input;
      if (!email || !password) throw new Error("Please provide a valid email");
      const id = uuid();
      
      try {
        let user = await dynamo
          .put({
            TableName,
            Item: {
              id,
              email,
              username,
              name,
              password: await bcrypt.hash(password, 10),
            },
        
          })
          .promise();

        return {
          ...input,
          id,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { email, password }, { res }) => {
      try {
        let user = await dynamo
          .get({
            TableName,
            Key: { email },
          })
          .promise();
        if (!user) throw new Error("No record found");

        const isMatch = bcrypt.compareSync(password, user.Item.password);
        if (!isMatch) throw new Error("Email or password is not correct");
        const payload = {
          id: user.Item.id,
          timeIn: Date.now(),
          email: user.Item.email
        };

        const token = sign(payload, config.SECRET);

        return {
          ...user.Item,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, { email }) => {
      try {
        const user = await dynamo
          .delete({ TableName, Key: { email } })
          .promise();

        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
