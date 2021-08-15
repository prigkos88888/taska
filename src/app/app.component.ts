import {Component, Renderer2} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public appService: AppService,
    private renderer: Renderer2,
  ) {
    this.appService.isSidenavOpen$.subscribe(isOpen => {
      if (isOpen) {
        this.renderer.addClass(document.body, 'sidenav-open');
        this.renderer.removeClass(document.body, 'sidenav-close');
      }
      else {
        this.renderer.addClass(document.body, 'sidenav-close');
        this.renderer.removeClass(document.body, 'sidenav-open');
      }
    });
  }
}
