import { createReducer, on } from "@ngrx/store";
import * as BooksActions from './books.actions';
import { BooksStateInterface } from "../types/books-state.interface";

export const initialState: BooksStateInterface = {
  limit: 5,
  page: 1,
  searchValue: null,
  books: [],
  totalPages: 0,
  isLoading: false,
  isBookModal: false,
  error: null
};

export const reducers = createReducer(
  initialState,
  on(BooksActions.setSearchValue, (state, { value }) => ({
    ...state,
    searchValue: value
  })),
  on(BooksActions.getBooks, (state, action) => ({
    ...state,
    isLoading: action.isLoading ? action.isLoading : false,
    limit: action.limit ? action.limit : state.limit,
    page: action.page ? action.page : state.page
  })),
  on(BooksActions.getBooksSuccess, (state, { totalPages, books }) => ({
    ...state,
    isLoading: false,
    totalPages,
    books
  })),
  on(BooksActions.getBooksFailure, (state, { message }) => ({
    ...state,
    isLoading: false,
    error: message
  })),
  on(BooksActions.saveNewBookSuccess, (state, { response }) => {
    return state
    // if we need to add it in current state
    // const books = [...state.books];
    // books.push(response);
    // return {
    //   ...state,
    //   books
    // }
  }),
  on(BooksActions.saveNewBookFailure, (state, { message }) => ({
    ...state,
    error: message
  })),
  on(BooksActions.updateBookSuccess, (state, { response }) => {
    let books = [...state.books];
    const bookIndex = books.findIndex(item => item.id === response.id );
    books[bookIndex] = response;
    // books = books.map(item => item.id === response.id ? response : item);
    return {
      ...state,
      books
    }
  }),
  on(BooksActions.updateBookFailure, (state, { message }) => ({
    ...state,
    error: message
  })),
  on(BooksActions.openBookModal, (state) => ({
    ...state,
    isBookModal: true
  })),
  on(BooksActions.closeBookModal, (state) => ({
    ...state,
    isBookModal: false
  })),
);
