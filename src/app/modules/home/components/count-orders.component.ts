import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-count-orders',
  templateUrl: './count-orders.component.html',
})
export class CountOrdersComponent implements OnInit, OnDestroy {
  count: number = 0;

  private subscription!: Subscription;
  constructor(private reportsService: ReportsService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.reportsService.countOrders$.subscribe((value: number) => {
      this.count = value;
    });
  }

  goTo(): void {
    this.router.navigate(['/order'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.count = 0;
  }
}
