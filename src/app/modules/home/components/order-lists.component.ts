import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/orders.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-lists',
  templateUrl: './order-lists.component.html',
})
export class OrderListsComponent implements OnInit, OnDestroy {
  orders: Order[] = [];

  private subscription!: Subscription;
  constructor(private ordersService: OrdersService, private message: MessageService) {}

  ngOnInit(): void {
    this.subscription = this.ordersService.orders$.subscribe(
      (value: Order[]) => {
        this.orders = value;
      }
    );
  }

  updateStatus(id: number, status: number): void {
    // const ids: number[] = this.selectedOrders.map((value: Order) => value.id!);

    this.ordersService.updateStatus([id], status).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.message.add({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ອັບເດດສຳເລັດ',
          });
        }
      },
      error: (err: any) => {
        const errMessage = err.error.message;
        this.message.add({
          severity: 'error',
          summary: 'ເກີດຂໍ້ຜິດພາດ',
          detail: errMessage,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.orders = [];
  }
}
