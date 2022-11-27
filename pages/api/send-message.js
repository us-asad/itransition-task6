import db from "utils/db";
import jwt from "jsonwebtoken"
import Message from "models/Message";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).send({ message: `Cannot ${req.method}` });

  const verified = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_SIGN);
  if (!verified?.name) return res.status(403).send({ message: "Access deined" });

  const data = req.body || {};
  if (!data.title || !data.message || !data.recipient_name) return res.status(400).send({ message: "Validation error!" });

  await db.connect();
  const message = await Message.create({ ...data, sender_name: verified.name });

  res.status(201).send({ message: "message created!", newMessage: message });
}