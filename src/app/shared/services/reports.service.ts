import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private apiUrl: string = '';

  private countOrders: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  countOrders$ = this.countOrders.asObservable();

  private countProducts: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  countProducts$ = this.countProducts.asObservable();

  private countUsers: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  countUsers$ = this.countUsers.asObservable();

  private countCustomer: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  countCustomer$ = this.countCustomer.asObservable();

  private bestSold: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  bestSold$ = this.bestSold.asObservable();

  private sold: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  sold$ = this.sold.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = `${environment.apiURL}/reports`;
  }

  getCountOrders() {
    const url = `${this.apiUrl}/count-orders`;

    return this.http.get<number>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const count = response.data;
          this.countOrders.next(count | 0);
        }
      })
    );
  }

  getCountProducts() {
    const url = `${this.apiUrl}/count-products`;

    return this.http.get<number>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const count = response.data;
          this.countProducts.next(count | 0);
        }
      })
    );
  }

  getCountUsers() {
    const url = `${this.apiUrl}/count-users`;

    return this.http.get<number>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const count = response.data;
          this.countUsers.next(count | 0);
        }
      })
    );
  }

  getCountCustomer() {
    const url = `${this.apiUrl}/count-customer`;

    return this.http.get<number>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const count = response.data;
          this.countCustomer.next(count | 0);
        }
      })
    );
  }

  getBestSold() {
    const url = `${this.apiUrl}/best-sold`;

    return this.http.get<any[]>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const data = response.data;
          this.bestSold.next(data);
        }
      })
    );
  }

  getSold() {
    const url = `${this.apiUrl}/sold`;

    return this.http.get<any[]>(url).pipe(
      tap((response: any) => {
        if(response?.statusCode === 200) {
          const data = response.data;
          this.sold.next(data);
        }
      })
    );
  }
}
