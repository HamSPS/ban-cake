import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/interfaces/card.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  @ViewChild('dv') dv!: ElementRef;
  carts: Cart[] = [];
  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private productsService: ProductsService,
    private router: Router
  ) {
    // this.carts = this.cartService.getItems();
  }


  ngOnInit(): void {
    this.productsService.findAll().subscribe();
    this.carts = this.cartService.getItems();
    // this.cartService.getItems.subscribe((value: Cart[]) => {
    //   this.carts = value;

    //   this.cdr.detectChanges();
    // });
  }

  updateCart(): void  {
    this.cartService.updateCart(this.carts);
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }

  checkOut(): void {
    this.router.navigate(['/order/check-out']);
  }
}
