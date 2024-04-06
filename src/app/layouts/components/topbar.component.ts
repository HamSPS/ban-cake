import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/shared/services/cart.service';
import { LayoutsService } from '../services/layouts.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarComponent implements OnInit {
  orderLength!: string;
  menuItems: MenuItem[] = [];

  constructor(
    public cartService: CartService,
    private cdr: ChangeDetectorRef,
    public layoutService: LayoutsService
  ) {
    // this.orderLength = this.cartService.getItemsLength();
    // this.cdr.markForCheck();
  }

  ngOnInit(): void {

    // this.cartService.getItems.subscribe((values) => {
    //   this.orderLength = values.length;
    //   console.log(values);

    //   this.cdr.markForCheck();
    // });

    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/home'],
      },
    ];

    this.orderLength = this.cartService.getItems().length.toString();
  }
}
