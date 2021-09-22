import { makeVar } from "@apollo/client";

export const drawerMessageVar = makeVar({
  type: null,
  size: "SMALL",
  isOpen: true,
});
