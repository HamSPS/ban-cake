import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ProductFormComponent } from './product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild(ProductFormComponent) dialog!: ProductFormComponent;
  products: Product[] = [];

  menuItems: MenuItem[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {

    this.productsService.findAll().subscribe();
    this.productsService.products$.subscribe((value: Product[]) => {
      this.products = value;
    });

    this.menuItems = [{
      label: 'ເມນູ',
      items: [{
        label: 'ແກ້ໄຂ',
        icon: 'pi pi-pencil',
        styleClass: 'text-green-500',
        color: 'green',
      },
      {
        label: 'ລົມ',
        icon: 'pi pi-times',
        styleClass: 'text-red-500',
        color: 'text-red-500',
      }]
    }];
  }

  handleMenuClick(item: Product, index: number): void {
    if(index === 0) {
      this.onUpdate(item)
    }else {

('delete ' + item.name);
    }
  }

  onCreate(): void {
    this.dialog.showDialog = true;
    this.dialog.header = 'ສ້າງສິນຄ້າ'
  }

  onUpdate(item: Product): void {
    this.dialog.showDialog = true;
    this.dialog.header = 'ແກ້ໄຂສິນຄ້າ';
    this.dialog.product = item;

  }

  onDelete(id: number) {
    this.productsService.delete(id).subscribe();
  }
}
