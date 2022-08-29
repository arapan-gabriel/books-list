import { createSelector } from "@ngrx/store";
import { AppStateInterface } from 'src/app/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.books;

export const searchValueSelector = createSelector(
  selectFeature,
  (state) => state.searchValue
);

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const booksSelector = createSelector(
  selectFeature,
  (state) => state.books
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

export const bookByIdSelector = (bookId: number) => {
  return createSelector(
    selectFeature,
    (state) => state.books.find(item => item.id === bookId)
  );
}

export const totalPagesSelector = createSelector(
  selectFeature,
  (state) => state.totalPages
);

export const isBookModalSelector = createSelector(
  selectFeature,
  (state) => state.isBookModal
);
