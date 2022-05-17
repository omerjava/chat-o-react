import { ORIGIN } from "../config/config";

export const messageApiCalls = {
  createMessage: async (userMessage, userID, channelID, token) => {
    const data = {
      data: {
        message: userMessage,
        users_permissions_user: {
          id: userID,
        },
        channel: {
          id: channelID,
        },
      },
    };

    const response = await fetch(`${ORIGIN}/api/messages`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    return response;
  },

  getMessages: async (token) => {
    const response = await fetch(`${ORIGIN}/api/messages?populate=%2A`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },

  deleteMessage: async (id, token) => {
    const response = await fetch(`${ORIGIN}/api/messages/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });

    return response;
  },
};
