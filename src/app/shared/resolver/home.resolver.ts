import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { ReportsService } from '../services/reports.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {
  constructor(private reportsService: ReportsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return forkJoin([
      this.reportsService.getCountCustomer(),
      this.reportsService.getCountOrders(),
      this.reportsService.getCountProducts(),
      this.reportsService.getCountUsers(),
      this.reportsService.getBestSold(),
      this.reportsService.getSold()
    ]);
  }
}
