import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { NotfoundComponent } from './modules/errors/notfound/notfound.component';
import { AccessDenyComponent } from './modules/errors/access-deny/access-deny.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home'},
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
      { path: 'order', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)},
      { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)},
      { path: 'bills', loadChildren: () => import('./modules/bills/bills.module').then( m => m.BillsModule ) }
    ],
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule )},
  { path: 'notfound', component: NotfoundComponent },
  { path: 'access-deny', component: AccessDenyComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
