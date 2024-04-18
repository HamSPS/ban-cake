import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CountOrdersComponent } from './components/count-orders.component';
import { CountProductsComponent } from './components/count-products.component';
import { CountUsersComponent } from './components/count-users.component';
import { CountCustomerComponent } from './components/count-customer.component';
import { OrderListsComponent } from './components/order-lists.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { BestSoldComponent } from './components/best-sold.component';
import { SoldComponent } from './components/sold.component';
import { ChartModule } from 'primeng/chart';


@NgModule({
  declarations: [
    HomeComponent,
    CountOrdersComponent,
    CountProductsComponent,
    CountUsersComponent,
    CountCustomerComponent,
    OrderListsComponent,
    BestSoldComponent,
    SoldComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    TableModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ChartModule
  ]
})
export class HomeModule { }
