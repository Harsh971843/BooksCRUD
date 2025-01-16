package com.example.library.Service;

import com.example.library.Repository.BookRepository;
import com.example.library.entity.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }
    public void deleteBook(Long id){
        if(bookRepository.existsById(id)){
            bookRepository.deleteById(id);
        }else{
            throw new RuntimeException("Book with Id "+id+"does not exist");
        }
    }

    // Additional methods like deleteBook, updateBook, etc.
}

