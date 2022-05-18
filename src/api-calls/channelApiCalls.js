import { ORIGIN } from "../config/config";

export const channelApiCalls = {
  createChannel: async (channel, username, token) => {
    const data = {
      data: {
        channel: channel,
        username: username,
      },
    };

    const response = await fetch(`${ORIGIN}/api/channels`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    return response;
  },

  getChannels: async () => {
    const response = await fetch(`${ORIGIN}/api/channels?populate=%2A`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  },

  deleteChannel: async (id, token) => {
    const response = await fetch(`${ORIGIN}/api/channels/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });

    return response;
  },
};
