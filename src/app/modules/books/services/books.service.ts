import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { BookInterface } from '../types/book.interface';
import { BOOKS } from '../../../core/mocks/books';

interface resInterface {
  books: BookInterface[],
  totalPages: number
}

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private books: BookInterface[] = BOOKS;
  constructor() { }
  requestTimeDelay: number = 200;

  getBooks(perPage = 5, page = 1, searchValue: string = ''): Observable<resInterface> {
    const value = searchValue.toLowerCase();
    const offset = (page - 1) * perPage;
    const filteredBooks = this.books.filter((item) => {
      if (item.title.toLowerCase().includes(value) || item.author.toLowerCase().includes(value) || item.genre.toLowerCase().includes(value)) {
        return item;
      }
      return null;
    })
    const books = filteredBooks.slice(offset).slice(0, perPage);
    const totalPages = Math.ceil(filteredBooks.length / perPage);

    return of({totalPages, books}).pipe(delay(this.requestTimeDelay));
  }

  updateBook(updatedBook: BookInterface): Observable<BookInterface> {
    this.books = this.books.map(item => item.id === updatedBook.id ? updatedBook : item);

    return of(updatedBook).pipe(delay(this.requestTimeDelay));
  }

  saveBook(addBook: any): Observable<BookInterface> {
    const newBook = { ...addBook };
    newBook['id'] = this.books[this.books.length - 1].id + 1;
    this.books.push(newBook);

    return of(newBook).pipe(delay(this.requestTimeDelay));
  }

  deleteBook(book: BookInterface): Observable<object> {
    const indexOfObject = this.books.findIndex(object => {
      return object.id === book.id;
    });
    this.books.splice(indexOfObject, 1);

    return of({ message: 'Ok' }).pipe(delay(this.requestTimeDelay));
  }
}
