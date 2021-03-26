import { verify } from "jsonwebtoken";
import { config } from "./config";

export const authentication = async (token) => {
  if (!token) {
    throw new Error("Unauthorized access");
  }
  const data = verify(token, config.SECRET);
  if (data) {
    console.log(data);
    return data;
  } else {
    throw new Error("Invalid token");
  }
};
