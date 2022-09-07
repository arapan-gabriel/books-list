import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { BookInterface } from '../../types/book.interface';
import * as BooksActions from '../../store/books.actions';
import { FilterInterface } from '../../types/filter.interface';
import { AppStateInterface } from '../../../../appState.interface';
import {
  booksSelector,
  byFilterSelector,
  filterSelector,
  errorSelector,
  isBookModalSelector,
  isLoadingSelector,
  searchValueSelector,
  totalPagesSelector
} from '../../store/books.selectors';

@Component({
  selector: 'app-books',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit, OnDestroy {

  error$: Observable<string | null>;
  books$: Observable<BookInterface[]>;
  filters$: Observable<FilterInterface>;
  isLoading$: Observable<boolean>;
  searchValue$: Observable<string | null>;
  byFilter$: Observable<FilterInterface>;
  isBookModal$: Observable<boolean>;
  totalPages$: Observable<number>;

  tableHeaders = [
    { head: 'Image', fieldName: 'image' },
    { head: 'Title', fieldName: 'title' },
    { head: 'Author', fieldName: 'author' },
    { head: 'Genre', fieldName: 'genre' },
    { head: 'Action', fieldName: '' }
  ];
  filters: object[] = [];
  byFilter: string[] = [];
  books: BookInterface[] = [];
  modalData: object = {};
  totalPages: number = 0;
  searchValue: string | null = '';
  page: number = 1;
  subscription = new Subscription();

  constructor(
    private store: Store<AppStateInterface>
  ) {
    this.error$ = this.store.pipe(select(errorSelector));
    this.books$ = this.store.pipe(select(booksSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.searchValue$ = this.store.pipe(select(searchValueSelector));
    this.filters$ = this.store.pipe(select(filterSelector));
    this.byFilter$ = this.store.pipe(select(byFilterSelector))
    this.isBookModal$ = this.store.pipe(select(isBookModalSelector));
    this.totalPages$ = this.store.pipe(select(totalPagesSelector));
  }

  ngOnInit(): void {
    this.dispatchGetBooks({ isLoading: true });
    this.store.dispatch(BooksActions.getGenreFilters());

    this.subscription.add(
      this.filters$.subscribe((res) => {
        this.filters = res.genre.map(el => {
          return { name: el, checked: false }
        });
      })
    );

    this.subscription.add(
      this.books$.subscribe(res => {
        this.books = res;
      })
    );

    this.subscription.add(
      this.totalPages$.subscribe((res) => {
        this.totalPages = res;
      })
    );

    this.subscription.add(
      this.searchValue$.subscribe(value => {
        if (typeof value === 'string') {
          this.searchValue = value;
          this.dispatchGetBooks({ searchValue: value, filters: this.byFilter });
        }
      })
    );

    this.subscription.add(
      this.byFilter$.subscribe(filter => {
        this.byFilter = filter.genre;
        this.dispatchGetBooks({ filters: this.byFilter })
      })
    );

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

  doSearch(value: string) {
    this.store.dispatch(BooksActions.setSearchValue({ value }));
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

  handleCheckedFilters(items: string[]) {
    this.store.dispatch(BooksActions.setGenreFilters({ genre: items }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
