import React, { useEffect, useState } from "react";
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        genre: "",
        publisher: "",
        yearPublished: "",
        totalCopies: "",
    });

    // Fetch all books on component mount
    useEffect(() => {
        fetch("http://localhost:8080/api/books")
            .then((response) => response.json())
            .then((data) => setBooks(data));
    }, []);

    // Handle input change for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    // Add a new book
    const handleAddBook = () => {
        fetch("http://localhost:8080/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks([...books, data]);
                setNewBook({
                    title: "",
                    author: "",
                    genre: "",
                    publisher: "",
                    yearPublished: "",
                    totalCopies: "",
                });
            });
    };

    // Delete a book by ID
    const handleDeleteBook = (id) => {
        fetch(`http://localhost:8080/api/books/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setBooks(books.filter((book) => book.id !== id));
            });
    };

    return (
        <div className="App">
            <h1>Books CRUD</h1>

            <div className="form">
                <h2>Add New Book</h2>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newBook.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newBook.author}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={newBook.genre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="publisher"
                    placeholder="Publisher"
                    value={newBook.publisher}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="yearPublished"
                    placeholder="Year Published"
                    value={newBook.yearPublished}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="totalCopies"
                    placeholder="Total Copies"
                    value={newBook.totalCopies}
                    onChange={handleInputChange}
                />
                <button onClick={handleAddBook}>Add Book</button>
            </div>

            <div className="book-list">
                <h2>Book List</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author}{" "}
                            <button onClick={() => handleDeleteBook(book.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
