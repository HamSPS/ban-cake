import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {
  private toggleMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly toggleMenu$ = this.toggleMenu.asObservable();

  private toggleSidebar: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly toggleSidebar$ = this.toggleSidebar.asObservable();
  constructor() { }

  toggle() {
    this.toggleMenu.next(!this.toggleMenu.value);
  }

  visible() {
    this.toggleSidebar.next(!this.toggleSidebar.value);
  }
}
