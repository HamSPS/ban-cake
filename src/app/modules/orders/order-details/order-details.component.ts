import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/card.interface';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  carts: Cart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.carts = this.cartService.getItems();
  }

  get summary(): number {
    let summary = 0;

    if (this.carts)
      summary = this.carts.reduce(
        (sum: number, value: Cart) => sum + value.price! * value.quantity!,
        0
      );
    return summary;
  }

  updateCart() {
    this.cartService.updateCart(this.carts);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  ngOnDestroy(): void {

  }
}
