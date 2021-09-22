import { makeVar } from "@apollo/client";

export const leadsVar = makeVar([
  {
    profilePic: "https://avatars.dicebear.com/api/croodles-neutral/:seed2.svg",
    shortIntro: "This is Kobe!\nHe's your product lead :)",
    longIntro:
      "Kone is a product fiend. He loves what Nike lab have done for the Bike brand as a whole, He believes in working with our partners to build sustainable supply chains",
  },
  {
    profilePic: "https://avatars.dicebear.com/api/croodles-neutral/:seed1.svg",
    shortIntro: "This is Mim!\nShe's your manufacturing\nnetwork lead :)",
    longIntro:
      "Mim is the driving force! Fluent in both English and Mandarin, Mim is the perfeect again on the inside of supply chains.",
  },
]);
