import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './order-list/order-list.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { OrderCheckOutComponent } from './order-check-out/order-check-out.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FieldsetModule } from 'primeng/fieldset';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { ProductListsComponent } from './order-create/components/product-lists.component';
import { OrderItemsComponent } from './order-create/components/order-items.component';
import { InputQuanityComponent } from './order-create/components/input-quanity/input-quanity.component';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderCheckOutComponent,
    OrderDetailsComponent,
    OrderCreateComponent,
    ProductListsComponent,
    OrderItemsComponent,
    InputQuanityComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    FieldsetModule,
    TagModule,
    ToastModule,
    DropdownModule,
    PaginatorModule,
    MenuModule,
    SidebarModule,
    BadgeModule,
    DynamicDialogModule
  ],
  providers: [DialogService]
})
export class OrdersModule { }
