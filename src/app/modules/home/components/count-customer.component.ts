import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-count-customer',
  templateUrl: './count-customer.component.html'
})
export class CountCustomerComponent implements OnInit, OnDestroy {
  count: number = 0;

  private subscription!: Subscription;
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.subscription = this.reportsService.countCustomer$.subscribe((value: number) => {
      this.count = value;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.count = 0;
  }
}
