import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'pagination'
})
export class PaginationDirective {

  pageNo: number = 1;
  @Input() totalPages: number = 1;
  @Output() emitPageValue = new EventEmitter<number>();

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  nextPage() {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

  prevPage() {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  setPage(page: number) {
    if (!(this.pageNo === page)) {
      this.pageNo = page;
      this.renderer.setProperty(this.el.nativeElement, 'value', page);
      this.emitPageValue.emit(page);
    }
  }

}
