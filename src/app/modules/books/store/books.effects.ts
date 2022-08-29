import { Injectable } from "@angular/core";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BooksActions from './books.actions';
import { BooksService } from "../services/books.service";

@Injectable()
export class BooksEffects {
  getAllBooks$ = createEffect(() =>
    this.actions$.pipe(ofType(BooksActions.getBooks),
      switchMap((props) => {
      return this.booksSvc
        .getBooks(props.limit, props.page, props.searchValue).pipe(
          map(res => BooksActions.getBooksSuccess(res)),
          catchError((error) => of(BooksActions.getBooksFailure({ message: error.message })))
        );
      })
    )
  )

  saveNewBooks$ = createEffect(() =>
    this.actions$.pipe(ofType(BooksActions.saveNewBook),
      switchMap((props) => {
        return this.booksSvc.saveBook(props.payload).pipe(
          map((res) => BooksActions.saveNewBookSuccess({ response: res })),
          catchError((error) => of(BooksActions.saveNewBookFailure({ message: error.message })))
        );
      })
    )
  )

  updateBookById$ = createEffect(() =>
    this.actions$.pipe(ofType(BooksActions.updateBook),
      switchMap((props) => {
        return this.booksSvc.updateBook(props.payload).pipe(
          map((res) => BooksActions.updateBookSuccess({ response: res })),
          catchError((error) => of(BooksActions.updateBookFailure({ message: error.message })))
        );
      })
    )
  )

  deleteBookById$ = createEffect(() =>
    this.actions$.pipe(ofType(BooksActions.deleteBook),
      switchMap((props) => {
        return this.booksSvc.deleteBook(props.payload).pipe(
          map((res: any) => BooksActions.deleteBookSuccess({ message: res.message })),
          catchError((error) => of(BooksActions.deleteBookFailure({ message: error.message })))
        );
      })
    )
  )

  constructor(
    private actions$: Actions,
    private booksSvc: BooksService
  ) {}
}
