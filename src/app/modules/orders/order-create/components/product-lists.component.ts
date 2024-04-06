import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
})
export class ProductListsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  // filterProducts: Product[] = [];
  filteredProducts: Product[] = [];
  cartLength$: Observable<string> = this.cartService.length$;

  first: number = 0;
  rows: number = 12;
  private subscription: Subscription = new Subscription();
  constructor(private productsService: ProductsService, private cartService: CartService) {}

  get filterProducts(): Product[] {
    return this.filteredProducts.slice(this.first, this.first + this.rows);
  }
  ngOnInit(): void {
    // this.cartLength = this.cartService.getLength();
    this.productsService.findAll().subscribe();
    this.subscription = this.productsService.products$.subscribe(
      (value: Product[]) => {
        this.products = value;
        this.filteredProducts = this.products;
      }
    );
  }

  onChangePage(event: any) {
    this.rows = event.rows;
    this.first = event.first;
  }

  onSearch(event: any): void {
    const search = event.target.value;
    this.filteredProducts = this.products.filter((value: Product) => {
      const name = value.name?.toLowerCase();
      const code = value.code?.toLowerCase();
      return name?.includes(search.toLowerCase()) || code?.includes(search.toLowerCase());
    });
    this.first = 0;
  }

  onOpenSidebar() {
    this.cartService.toggleSidebar();
  }

  addToCart(item: Product) {
    this.cartService.addToCart(item);
    // this.cartLength = this.cartService.getLength();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
