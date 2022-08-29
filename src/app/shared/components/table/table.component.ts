import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent {
  @Input() tableHeaders :any[] = [];
  @Input() tableData :any[] = [];
  @Output() onEdit = new EventEmitter<any>;
  @Output() onDelete = new EventEmitter<any>;

  edit(data: any) {
    this.onEdit.emit({
      data,
      action: 'row-edit'
    });
  }

  delete(data: any) {
    this.onDelete.emit({
      data,
      action: 'row-delete'
    });
  }
}
