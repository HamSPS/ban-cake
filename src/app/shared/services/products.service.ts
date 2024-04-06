import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl: string = '';

  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    []
  );
  readonly products$ = this.products.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiURL + '/products';
  }

  findAll() {
    const url = `${this.apiUrl}`;

    return this.http.get<Product[]>(url).pipe(
      tap((response: any) => {
        if (response.statusCode === 200) {
          this.products.next(response.data);
        }
      })
    );
  }

  create(body: any) {
    const url = `${this.apiUrl}`;

    return this.http.post<Product>(url, body).pipe(
      tap((response: any) => {
        if (response.statusCode === 201) {
          const products = this.products.value;
          products.push(response.data);
          this.products.next(products);
        }
      })
    );
  }

  update(id: number, body: any) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.patch<Product>(url, body).pipe(
      tap((response: any) => {
        if (response.statusCode === 200) {
          const products = this.products.value;
          products.forEach((value: Product, i: number) => {
            if(id === value.id) products[i] = response.data;
          });
          this.products.next(products);
        }
      })
    );
  }

  delete(id: number) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Product>(url).pipe(
      tap((response: any) => {
        if (response.statusCode === 200) {
          const products = this.products.value;
          const filter = products.filter((value: Product) => value.id !== id);
          this.products.next(filter);
        }
      })
    );
  }
}
