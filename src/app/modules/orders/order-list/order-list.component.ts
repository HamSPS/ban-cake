import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/orders.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];

  selectedOrders: Order[] = [];
  private unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    public cartService: CartService,
    private router: Router,
    private ordersService: OrdersService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    const status = 1;
    this.ordersService.findByStatus(status).subscribe();
    this.ordersService.orders$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value: Order[] | null) => {
        if (value) this.orders = value;

(value);

      });
  }

  get summary(): number {
    return 0;
  }

  viewBill(id: number) {
    this.router.navigate(['/bills', id]);
  }

  updateStatus(status: number): void {
    const ids: number[] = this.selectedOrders.map((value: Order) => value.id!);

    this.ordersService.updateStatus(ids, status).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.message.add({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ອັບເດດສຳເລັດ',
          });
        }
      },
    });
  }

  filter(table: Table, event: any): void {

(event);

    table.filterGlobal(event.value, 'contains');
    // this.filterService.filter(en)
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next([]);
    this.unsubscribeAll.complete();
    this.orders = [];
  }
}
