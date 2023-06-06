import { getUserID } from "./Storage";

export const isAuthenticated = () => {
 return getUserID() != null ? true : false;
};

