import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { InputComponent } from './shared/widgets/input/input.component';
import { ButtonComponent } from './shared/widgets/button/button.component';
import { TableComponent } from './shared/components/table/table.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { BooksListComponent } from './modules/books/components/books-list/books-list.component';
import { BookModalComponent } from "./modules/books/components/book-modal/book-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginationDirective } from './shared/directives/pagination.directive';
import { SearchComponent } from './shared/components/search/search.component';
import { FilterComponent } from './shared/components/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TableComponent,
    BooksListComponent,
    HeaderComponent,
    InputComponent,
    LoadingComponent,
    BookModalComponent,
    PaginationDirective,
    SearchComponent,
    FilterComponent
  ],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
            autoPause: true
        }),
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
