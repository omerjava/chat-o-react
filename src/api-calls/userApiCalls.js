import { ORIGIN } from "../config/config";

export const userApiCalls = { 
    getUserById : async (id, token) => {

        const response = await fetch(`${ORIGIN}/api/users/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
        }
            );

            return response;

    },

    getUsers: async (token) => {
        const response = await fetch(`${ORIGIN}/api/users`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response;
    },

    deleteUser: async (id, token) => {
      const response = await fetch(`${ORIGIN}/api/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });
  
      return response;
    },
    
};