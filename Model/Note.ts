import { Schema, Document, model, models } from "mongoose";

interface INote extends Document {
  data: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<INote>(
  {
    data: { type: String, required: true },
    done: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  }
);

export default models.Note || model<INote>("Note", NoteSchema);
