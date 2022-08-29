import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {

  @Input() data: any = {};
  @Output() emitAction = new EventEmitter<any>;
  bookForm: FormGroup;
  title: string = '';
  modalMode: string = '';

  constructor(
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      image: [''],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data && this.data.action) {
      switch (this.data.action) {
        case 'row-add':
          this.title = 'Add Book';
          this.modalMode = 'create';
          break;
        case 'row-edit':
          this.title = 'Update Book';
          this.modalMode = 'edit';
          if (this.data.data) {
            const {
              title,
              author,
              genre
            } = this.data.data;
            this.bookForm.patchValue({
              title,
              author,
              genre
            });
          }
          break;
        case 'row-delete':
          this.title = 'Delete Book';
          this.modalMode = 'delete';
          break;
      }
    }
  }

  doAction(action: string) {
    let data = this.data.data;
    let formData = this.bookForm.value;
    if (data) {
      formData = {
        ...formData,
        id: data.id,
        image: data.image
      }
    }
    this.emitAction.emit({
      formData,
      action
    });
  }

}
