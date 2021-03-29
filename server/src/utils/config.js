import AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config();

export const AWS_CONFIG = {
  aws_table_item: "item",
  aws_table_user: "user",
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "us-east-1",
  },
};

AWS.config.update(AWS_CONFIG.aws_remote_config);

export const dynamo = new AWS.DynamoDB.DocumentClient();

export const config = {
  SECRET: process.env.SECRET || "khdkdkdakdke",
  AWS_CONFIG,
};

// export default config;
