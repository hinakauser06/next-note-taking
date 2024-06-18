import type { NextApiRequest, NextApiResponse } from "next";
import Note from "../../../Model/Note";
// import connectDB from "@/pages/lib/connectDb";

import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function connectDB() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };
  
      cached.promise = mongoose
        .connect(DATABASE_URL as string, opts)
        .then((mongoose) => {
          return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }
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
