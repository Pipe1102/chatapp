import authAxios from ".";

export const getConversationForUser = async () => {
  const response = await authAxios.get("/conversation");
  return response.data;
};

export const addConversation = async (username: string) => {
  const obj = { username };
  const response = await authAxios.post("/conversation", obj);
  return response.data;
};

export const getConversationById = async (id: string) => {
  const response = await authAxios.get(`/conversation/${id}`);
  return response.data;
};
