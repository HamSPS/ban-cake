import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderCheckOutComponent } from './order-check-out/order-check-out.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: OrderListComponent,
      },
      { path: 'create', component: OrderCreateComponent },
      {
        path: 'check-out',
        component: OrderCheckOutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
