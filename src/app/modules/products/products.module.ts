import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListsComponent } from './product-lists/product-lists.component';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ProductFormComponent } from './product-form/product-form.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    DataViewModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    MenuModule,
    DialogModule
  ],
  exports: [
    ProductListsComponent
  ]
})
export class ProductsModule { }
