import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() text: string = '';
  @Input() btnClass: string = '';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<any>;

  eventEmit() {
    this.onClick.emit();
  }

}
