import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from 'src/app/shared/resolver/home.resolver';
import { OrdersResolver } from 'src/app/shared/resolver/orders.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      report: HomeResolver,
      orders: OrdersResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
