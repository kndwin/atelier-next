import { makeVar } from "@apollo/client";

export const customersVar = makeVar({
  customer: 
    {
      logo: "svg/orange-smiling-cloud.svg",
      name: "BEAR",
    },
  customers: [
    {
      logo: "svg/orange-smiling-cloud.svg",
      name: "BEAR",
    },
    {
      logo: "svg/cloud.svg",
      name: "LITTLE CO",
    },
    {
      logo: "svg/cloud-2.svg",
      name: "CHILLHOUSE",
    },
  ],
});
