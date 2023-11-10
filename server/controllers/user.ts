import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import prisma from "../prismaClient";

export const SECRET_KEY: Secret = process.env.TOKEN_SECRET || "secret";
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, imgUrl } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username already exists in the databse" });
    const hashedPassword = await bcrypt.hash(password, 8);
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        imgUrl,
      },
    });
    return res.status(201).json({ message: "Registered" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) return res.status(404).json({ message: "Incorect username" });

    const isPasswordMatch = bcrypt.compare(user.password, password);
    if (!isPasswordMatch)
      return res.status(404).json({ message: "Incorect password" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: "2 days",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
