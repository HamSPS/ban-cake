import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { LayoutsService } from '../services/layouts.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  @ViewChild('btn') btn!: ElementRef<HTMLButtonElement>;
  toggle: boolean = false;
  orderLength!: string;
  menuItems: MenuItem[] = [];

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    public layoutService: LayoutsService,
    private authService: AuthService
  ) {
    // this.orderLength = this.cartService.getItemsLength();
    // this.cdr.markForCheck();
  }

  ngOnInit(): void {
    document.addEventListener('click', (_e) => {
      const menu = this.menu.nativeElement;
      const btn = this.btn.nativeElement;
      const target = _e.target as HTMLElement;
      // if (!menu.contains(target) && !btn.contains(target)) {
      if (!btn.contains(target)) {
          menu.classList.remove('block');
          menu.classList.add('hidden');
          this.toggle = false
      }
      // menu.classList.toggle('hidden')
  });

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
    ];

    this.orderLength = this.cartService.getItems().length.toString();
  }

  toggleMenu() {
    const menu = this.menu.nativeElement;
    if (this.toggle) {
      menu.classList.add('hidden');
      menu.classList.remove('block');
      this.toggle = false;
    } else {
      menu.classList.add('block');
      menu.classList.remove('hidden');
      this.toggle = true;
    }
  }

  logOut() {
    this.authService.signOut();
  }
}
