import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/interfaces/card.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderCheckOutComponent } from '../../order-check-out/order-check-out.component';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
})
export class OrderItemsComponent implements OnInit {
  carts: Cart[] = [];
  menuItems: MenuItem[] = [
    {
      label: 'Draft',
      icon: 'pi pi-paperclip',
    },
  ];

  cartLength!: number;

  ref!: DynamicDialogRef;

  constructor(
    private cartService: CartService,
    private router: Router,
    private dialog: DialogService
  ) {}

  get totalPrice(): number {
    let sum = 0;
    if (this.carts.length) {
      sum = this.carts.reduce(
        (sum: number, value: Cart) => (sum += value.price! * value.quantity!),
        0
      );
    }
    return sum;
  }

  ngOnInit(): void {
    this.carts = this.cartService.getItems();
    this.cartService.length$.subscribe((value: string) => {
      this.cartLength = +value;
    });
  }

  remove(index: number) {
    this.cartService.removeItem(index);
  }

  update() {
    this.cartService.updateCart(this.carts);
  }

  clear() {
    this.carts = [];
    this.cartService.clearCart();
  }

  checkOut() {
    // this.router.navigate(['/order/check-out']);
    this.ref = this.dialog.open(OrderCheckOutComponent, {
      header: 'ຂໍ້ມູນລູກຄ້າ',
      contentStyle: {
        'overflow': 'visible'
      }
    })
  }
}
