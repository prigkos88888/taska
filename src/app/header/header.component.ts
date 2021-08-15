import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isSidenavOpen = false;

  constructor(
    public appService: AppService
  ) {}

  ngOnInit(): void {}

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.appService.isSidenavOpen$.next(this.isSidenavOpen);
  }
}
