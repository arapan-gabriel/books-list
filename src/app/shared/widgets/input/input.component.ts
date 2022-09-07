import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() inputType: string = 'text';
  @Input() placeholderText: string = '';
  @Output() emitInputValue = new EventEmitter<string>;

  handleKeyUp(value: any) {
    this.emitInputValue.emit(value.target.value);
  }

}
