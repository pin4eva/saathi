import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { config, dynamo } from "../utils/config";
import crypto from "crypto";
import { sign } from "jsonwebtoken";
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
  },
  Mutation: {
    signup: async (_, { input }) => {
      const { email, password, username, name } = input;
      if (!email || !password) throw new Error("Please provide a valid email");
      const id = uuid();
      //   let hash = crypto.createHmac("sha512", password);
      //   hash = hash.update(password).toString();
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
            ReturnConsumedCapacity: "TOTAL",
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
