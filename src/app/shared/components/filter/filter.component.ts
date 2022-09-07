import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  checkedList: string[] = [];
  showDropDown = false;
  @Input() list: any[] = [];
  @Output() emitCheckedFilters = new EventEmitter();

  getSelectedValue(status: boolean, value: string) {
    if (status) {
      this.checkedList = [...this.checkedList];
      this.checkedList.push(value)
    }
     else {
      this.checkedList = [...this.checkedList];
      const index = this.checkedList.indexOf(value);
      this.checkedList.splice(index,1);
    }
    this.shareCheckedFilters();
  }

  shareCheckedFilters() {
    this.emitCheckedFilters.emit(this.checkedList);
  }

}
