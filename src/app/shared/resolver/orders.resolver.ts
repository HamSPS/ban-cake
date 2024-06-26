import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrdersService } from '../services/orders.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolver implements Resolve<any> {
  constructor(private ordersService: OrdersService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.ordersService.findByStatus(1);
  }
}
