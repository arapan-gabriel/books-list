import { createAction, props } from "@ngrx/store";
import { BookInterface, CreateBookInterface } from "../types/book.interface";

export const setSearchValue = createAction(
  '[Filter-Set] Set search value',
  props<{ value: string }>()
);

export const setGenreFilters = createAction(
  '[Filter-Set] Set Genre Filters',
  props<{ genre: string[] }>()
);

export const getGenreFilters = createAction(
  '[Filter-GET] Get Genre Filters'
);

export const getGenreFiltersSuccess = createAction(
  '[Filter-GET] Get Genre Filters Success',
  props<{ filters: string[] }>()
);

export const getGenreFiltersFailure = createAction(
  '[Filter-GET] Get Genre Filters Failure',
  props<{ message: string }>()
);

export const getBooks = createAction(
  '[Books-GET] Get Books',
  props<any>()
);

export const getBooksSuccess = createAction(
  '[Books-GET] Get Books Success',
  props<{ books: BookInterface[], totalPages: number }>()
);

export const getBooksFailure = createAction(
  '[Books-GET] Get Books Failure',
  props<{ message: string }>()
);

export const saveNewBook = createAction(
  '[Books-POST] Save Book',
  props<{ payload: CreateBookInterface }>()
);

export const saveNewBookSuccess = createAction(
  '[Books-POST] Save Book Success',
  props<{ response: BookInterface }>()
);

export const saveNewBookFailure = createAction(
  '[Books-POST] Save Book Failure',
  props<{ message: string }>()
);

export const updateBook = createAction(
  '[Books-POST] Update Book',
  props<{ payload: BookInterface }>()
);

export const updateBookSuccess = createAction(
  '[Books-POST] Update Book Success',
  props<{ response: BookInterface }>()
);

export const updateBookFailure = createAction(
  '[Books-POST] Update Book Failure',
  props<{ message: string }>()
);

export const deleteBook = createAction(
  '[Books-DELETE] Delete Book',
  props<{ payload: BookInterface }>()
);

export const deleteBookSuccess = createAction(
  '[Books-DELETE] Delete Book Success',
  props<{ message: string }>()
);

export const deleteBookFailure = createAction(
  '[Books-DELETE] Delete Book Failure',
  props<{ message: string }>()
);

export const openBookModal = createAction(
  '[Book-Modal] Show Book Modal'
);

export const closeBookModal = createAction(
  '[Book-Modal] Hide Book Modal'
);
