import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styles: [
    `
      input[type='number'] {
        appearance: textfield;
      }

      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        appearance: none;
      }
    `,
  ],
})
export class OrderCreateComponent implements OnInit {
  isOpen$: Observable<boolean> = this.cartService.isOpenSidebar$;

  constructor(
    public cartService: CartService,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.productsService.findAll().subscribe();
  }

  onHideSidebar(){
    this.cartService.toggleSidebar();
  }

}
