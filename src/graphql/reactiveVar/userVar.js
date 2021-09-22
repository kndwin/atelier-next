import { makeVar } from "@apollo/client";

// TODO(kndwin): Store in localStorage to persist on refresh
export const userVar = makeVar({ 
  cookie: "",
	name: "",
	email: "",
	profile: "https://avatars.dicebear.com/api/croodles/:seedy.svg", 
	isAdmin: "",
	id: "",
	company: "Bear LTD"
});
