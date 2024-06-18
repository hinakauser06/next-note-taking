import type { NextApiRequest, NextApiResponse } from "next";
import Note from "../../../Model/Note";
import connectDB from "@/pages/lib/connectDb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();
  if (req.method === "POST") {
    const note = new Note({
      data: req.body,
    });
    await note.save();
    res.status(201).json({ data: "created" });
  }
  if (req.method === "GET") {
    const data = await Note.find();
    res.status(200).json({ data });
  }
  if (req.method === "DELETE") {
    await Note.deleteOne({_id: req.body.note_id});
    res.status(200).json({ data: "deleted" });
  }
  if (req.method === "PATCH") {
    await Note.updateOne({_id: req.body.note_id}, { done: true });
    res.status(200).json({ data: "updated" });
  }
}
