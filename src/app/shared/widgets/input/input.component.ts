import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() inputType: string = 'text';
  @Input() placeholderText: string = '';
  @Output() emitInputValue = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  handleKeyUp(value: any) {
    this.emitInputValue.emit(value.target.value);
  }

}
