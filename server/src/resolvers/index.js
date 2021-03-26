import todoResolvers from "./todoResolver";
import userResolver from "./userResolver";

export default {
  Query: { ...todoResolvers.Query, ...userResolver.Query },
  Mutation: { ...todoResolvers.Mutation, ...userResolver.Mutation },
};
