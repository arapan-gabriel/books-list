import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Theme } from "../../../app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() text: string = '';
  theme: Theme = 'light-theme';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.initializeTheme();
  }

  initializeTheme = (): void => {
    this.renderer.addClass(this.document.body, this.theme);
  }

  switchTheme() {
    this.document.body.classList.replace(
      this.theme,
      this.theme === 'light-theme'
        ? this.theme = 'dark-theme'
        : this.theme = 'light-theme'
    );
  }

}
