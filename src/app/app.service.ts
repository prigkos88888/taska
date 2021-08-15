import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isSidenavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
