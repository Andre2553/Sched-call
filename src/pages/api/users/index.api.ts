// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { prisma } from "../../../lib/prisma";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { name, username } = req.body;

  if (!name || !username) return res.status(400).end("Bad request");
  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (userExists) {
    return res.status(409).end("User already exists");
  }
  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  });
  setCookie({ res }, "@schedCall:userId", user.id, {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
  res.status(201).json(user);
}
