import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss'],
})
export class ProductListsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.productService.products$.subscribe((value: any[]) => {
      this.products = value;
      this.cdr.detectChanges();
    });
  }

  onClick(item: Product): void {
    this.cartService.addToCart(item);
  }

  onSearch(dv: DataView, event: any) {
     const search = event?.target?.value;
     dv.filter(search, 'contains');

  }
}
