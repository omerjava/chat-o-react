import { ORIGIN } from "../config/config";
const qs = require('qs');

export const privateMessageApiCalls = {
  createPrivateMessage: async (message, toUser, fromUser, token) => {
    const data = {
        data: {
          privateMessage: message,
          messageTo: toUser,
          messageFrom: fromUser       
        },
      };
  
      const response = await fetch(`${ORIGIN}/api/private-messages`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      return response;
   },

   getPrivateMessagesByUsername: async (username, token) => {
    
    const query = qs.stringify({
      filters: {
        messageTo: {
          $eq: username,
        },
      },
    }, {
      encodeValuesOnly: true,
    });
    
        const response = await fetch(`${ORIGIN}/api/private-messages?${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response;
   },

   deletePrivateMessage: async(id, token) => {
       const response = await fetch(`${ORIGIN}/api/private-messages/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      });

       return response;
   }
}