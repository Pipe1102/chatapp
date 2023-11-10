import { Request, Response } from "express";
import prisma from "../prismaClient";

export const getConversationForUser = async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  try {
    const coversations = await prisma.conversation.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });
    return res.status(200).json(coversations);
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
export const createConversation = async (req: Request, res: Response) => {
  const loggedInUser = res.locals.user.id;
  const { username } = req.body;
  try {
    const reciver = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!reciver)
      return res.status(404).json({ message: "No user found by username" });

    await prisma.conversation.create({
      data: {
        users: {
          connect: [{ id: loggedInUser }, { id: reciver?.id }],
        },
      },
    });
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
