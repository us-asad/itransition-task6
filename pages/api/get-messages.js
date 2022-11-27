import db from "utils/db";
import jwt from "jsonwebtoken"
import Message from "models/Message";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(400).send({ message: `Cannot ${req.method}` });

  const verified = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SIGN);
  if (!verified?.name) return res.status(403).send({ message: "Access deined" });

  await db.connect();
  const sentMessages = await Message.find({ sender_name: verified.name }).exec();
  const recivedMessages = await Message.find({ recipient_name: verified.name }).exec();
  const sortedAllMessages = [...sentMessages, ...recivedMessages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.status(200).send({ messages: sortedAllMessages });
}