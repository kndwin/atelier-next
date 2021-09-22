import { InMemoryCache } from "@apollo/client";
import { chatVar } from "./reactiveVar";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        chat: {
          read(_, { variables }) {
            return chatVar();
          },
        },
      },
    },
  },
});
