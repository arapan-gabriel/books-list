import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { reducers } from "./store/books.reducers";
import { BooksEffects } from "./store/books.effects";
import { BooksService } from "./services/books.service";
import { BooksRoutingModule } from './books-routing.module';


@NgModule({
    imports: [
        CommonModule,
        BooksRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BooksEffects])
    ],
    providers: [BooksService]
})

export class BooksModule { }
