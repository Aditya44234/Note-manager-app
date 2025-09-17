import mongoose from "mongoose";

// Schema for Notes input ,in this way the input of notes will be there
// and it will be stored in the MongoDB database
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Notes", noteSchema);

export default Note;
