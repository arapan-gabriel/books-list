import { BookInterface } from "./book.interface";

export interface BooksStateInterface {
  limit: number;
  page: number;
  searchValue: string | null;
  books: BookInterface[];
  totalPages: number;
  isLoading: boolean;
  isBookModal: boolean;
  error: string | null;
}
