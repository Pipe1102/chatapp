import prisma from "../prismaClient";

export const saveMessage = async (
  userId: string,
  conversationId: string,
  content: string
) => {
  try {
    await prisma.message.create({
      data: {
        userId,
        content: content,
        conversationId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const getConversationMessages = async (conversationId: string) => {
  try {
    const conversationMessages = await prisma.message.findMany({
      where: {
        conversation: {
          id: conversationId,
        },
      },
      include: {
        user: true,
      },
    });
    return conversationMessages;
  } catch (error) {}
};
