import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Order } from '../interfaces/orders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  apiUrl: string = '';

  private order: BehaviorSubject<Order | null> =
    new BehaviorSubject<Order | null>(null);
  readonly order$ = this.order.asObservable();

  private orders: BehaviorSubject<Order[] | null> = new BehaviorSubject<
    Order[] | null
  >(null);
  readonly orders$ = this.orders.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL;
  }

  create(formData: Object): Observable<any> {
    const url = `${this.apiUrl}/orders`;

    return this.http.post<Order>(url, formData).pipe(
      map((response: any) => {
        if (response.statusCode === 201 && response.data) {
          return response.data;
        }
      })
    );
  }

  findByStatus(status: number): Observable<Order[]> {
    const url = `${this.apiUrl}/orders/status`;

    return this.http.get<Order[]>(url, { params: { status: status } }).pipe(
      tap((response: any) => {
        if(response.statusCode === 200 && response.data) {
          const orders = response.data;

(response);

          this.orders.next(orders);
        }
      })
    );
  }

  findOne(id: number) {
    const url = `${this.apiUrl}/orders/find/${id}`;

    return this.http.get<Order>(url).pipe(
      tap((response: any) => {
        if (response.statusCode === 200 && response.data) {
          const order = response.data;
          this.order.next(order);
        }
      })
    );
  }

  updateStatus(ids: number[], status: number) {
    const url = `${this.apiUrl}/orders/status/${ids}`;

    return this.http.patch<Order>(url, {status: status}).pipe(
      map((response: any) => {
        if(response.statusCode === 200) {
          const orders = this.orders.getValue();
          const filter: Order[] = orders?.filter((value: Order) => !ids.includes(value.id!))!;

          this.orders.next(filter);

          return true;
        }
        return false;
      })
    );
  }
}
