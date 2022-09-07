import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() emitSearchValue = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  inputValue(value: string) {
    this.emitSearchValue.emit(value);
  }

}
