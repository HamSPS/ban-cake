import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Cart } from '../interfaces/card.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carts: Cart[] = [];
  private length: BehaviorSubject<string> = new BehaviorSubject<string>('0');
  readonly length$ = this.length.asObservable();

  private isOpenSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isOpenSidebar$ = this.isOpenSidebar.asObservable();

  // private carts: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);

  constructor(private storage: LocalStorageService) {
    const saveCart = this.storage.retrieve('CART');
    if(saveCart) this.carts = saveCart;
  }

  getItems(): Cart[] {
    return this.carts;
  }

  toggleSidebar() {
    this.isOpenSidebar.next(!this.isOpenSidebar.value);
  }

  addToCart(item: Product): void {
    const id = item.id;
    const exist = this.carts.some((value: Cart, i: number) => {
      if (value.product!.id === id!) {
        this.carts[i].quantity! += 1;
        this.saveCartToStorage();
        return true;
      } else {
        return false;
      }
    });

    if (!exist) {
      const newItem: Cart = {
        product: item,
        cost: item.cost,
        price: item.price,
        quantity: 1,
      };
      this.carts.push(newItem);
      this.saveCartToStorage();
    }
  }

  updateCart(carts: Cart[]): void {
    this.carts = carts;
    this.saveCartToStorage();
  }

  removeItem(index: number) {
    this.carts.splice(index, 1);
    this.saveCartToStorage();
  }

  clearCart() {
    this.carts = [];
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    this.storage.store('CART', this.carts);
    this.length.next(this.carts.length.toString());
  }
}
