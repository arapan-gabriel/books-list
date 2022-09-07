import { BookInterface } from "./book.interface";
import { FilterInterface } from "./filter.interface";

export interface BooksStateInterface {
  limit: number;
  page: number;
  searchValue: string | null;
  byFilters: FilterInterface;
  filters: FilterInterface;
  books: BookInterface[];
  totalPages: number;
  isLoading: boolean;
  isBookModal: boolean;
  error: string | null;
}
