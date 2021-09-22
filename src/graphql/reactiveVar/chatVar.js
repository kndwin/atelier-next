import { makeVar } from "@apollo/client";
const chatVarInit = [
  {
    name: "Cat Tsang",
    time: Date.now() - 60 * 1000 * 60 * 60 * 24,
    attachment: {
      href: "#",
      name: "VIEW BRIEF HERE",
    },
    chatContent: "Formulation brief submitted",
    type: "CHAT",
  },
];

export const chatVar = makeVar(chatVarInit);
