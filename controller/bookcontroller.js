import Book from "../Model/bookmodel.js";

/* CREATE BOOK */
export const createbooks = async (req, res) => {
  try {
    const { title } = req.body;

    const existingbook = await Book.findOne({ title });
    if (existingbook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const savedbook = await Book.create(req.body);

    res.status(201).json(savedbook);
  } catch (error) {
    console.error("ERROR IN CREATE BOOK CONTROLLER:", error);
    res.status(500).json({ message: error.message });
  }
};

/* FETCH ALL BOOKS */
export const fetchbooks = async (req, res) => {
  try {
    const books = await Book.find();

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error("ERROR IN FETCH BOOKS:", error);
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE BOOK */
export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("ERROR IN UPDATE BOOK:", error);
    res.status(500).json({ message: error.message });
  }
};

/* DELETE BOOK */
export const deleted = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("ERROR IN DELETE BOOK:", error);
    res.status(500).json({ message: error.message });
  }
};
