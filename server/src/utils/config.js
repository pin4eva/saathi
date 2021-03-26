import AWS from "aws-sdk";

export const AWS_CONFIG = {
  aws_table_item: "item",
  aws_table_user: "user",
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: "AKIAYISK6AYZCQFNGYE4",
    secretAccessKey: "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",
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
