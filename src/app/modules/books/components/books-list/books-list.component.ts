import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { BookInterface } from '../../types/book.interface';
import * as BooksActions from '../../store/books.actions';
import { AppStateInterface } from "../../../../appState.interface";
import {
  booksSelector,
  errorSelector,
  isBookModalSelector,
  isLoadingSelector, searchValueSelector,
  totalPagesSelector
} from "../../store/books.selectors";


@Component({
  selector: 'app-books',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  error$: Observable<string | null>;
  books$: Observable<BookInterface[]>;
  isLoading$: Observable<boolean>;
  searchValue$: Observable<string | null>;
  isBookModal$: Observable<boolean>;
  totalPages$: Observable<number>;

  tableHeaders = [
    { head: 'Image', fieldName: 'image' },
    { head: 'Title', fieldName: 'title' },
    { head: 'Author', fieldName: 'author' },
    { head: 'Genre', fieldName: 'genre' },
    { head: 'Action', fieldName: '' }
  ];
  books: BookInterface[] = [];
  modalData: object = {};
  totalPages: number = 0;
  searchValue: string | null = '';
  page: number = 1;

  constructor(
    private store: Store<AppStateInterface>
  ) {
    this.error$ = this.store.pipe(select(errorSelector));
    this.books$ = this.store.pipe(select(booksSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.searchValue$ = this.store.pipe(select(searchValueSelector));
    this.isBookModal$ = this.store.pipe(select(isBookModalSelector));
    this.totalPages$ = this.store.pipe(select(totalPagesSelector));
  }

  ngOnInit(): void {
    this.dispatchGetBooks({ isLoading: true });
    this.books$.subscribe(res => {
      this.books = res;
    });
    this.totalPages$.subscribe((res) => {
      this.totalPages = res;
    });
    this.searchValue$.subscribe(value => {
      if (typeof value === 'string') {
        this.searchValue = value;
        this.dispatchGetBooks({ searchValue: value });
      }
    });
  }

  tableAction(data: any) {
    this.store.dispatch(BooksActions.openBookModal());
    this.modalData = data;
  }

  doModalAction(data: any) {
    if (data && data.action) {
      const {
        id,
        image,
        title,
        author,
        genre
      } = data.formData;
      switch (data.action) {
        case 'create':
          this.store.dispatch(BooksActions.saveNewBook({ payload: {
              image: null,
              title,
              author,
              genre
            }
          }));
          this.dispatchCloseModel();
          break;
        case 'update':
          this.store.dispatch(BooksActions.updateBook({ payload: {
              id,
              image,
              title,
              author,
              genre
            }
          }));
          this.dispatchCloseModel();
          break;
        case 'delete':
          this.store.dispatch(BooksActions.deleteBook({ payload: {
              id,
              image,
              title,
              author,
              genre
            }
          }));
          this.dispatchCloseModel();
          this.dispatchGetBooks({ page: this.page, searchValue: this.searchValue });
          break;
        case 'cancel':
          this.dispatchCloseModel();
          break;
      }
    }
  }

  onPageChange(value: number) {
    this.page = value;
    this.dispatchGetBooks({ page: value, searchValue: this.searchValue });
  }

  dispatchGetBooks(options: object = {}) {
    this.store.dispatch(BooksActions.getBooks(options));
  }

  dispatchCloseModel() {
    this.store.dispatch(BooksActions.closeBookModal());
  }

}
