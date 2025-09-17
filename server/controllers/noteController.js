import Note from "../models/note.js";

// To create a new Note in the DB
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and Description are required" });
    }

    const newNote = await Note.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// To get all the saved notes from DB
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch ",
      error: error.message,
    });
  }
};

// Update a specific note by its ID
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both Title and Description are required",
      });
    }

    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not not updated",
      error: error.message,
    });
  }
};

//  Lets delete the perticular note by ID

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.user._id });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    await note.remove();
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Note not deleted",
      error: error.message,
    });
  }
};
