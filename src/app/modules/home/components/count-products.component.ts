import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-count-products',
  templateUrl: './count-products.component.html'
})
export class CountProductsComponent implements OnInit, OnDestroy {
  count: number = 0;

  private subscription!: Subscription;
  constructor(private reportsService: ReportsService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.reportsService.countProducts$.subscribe((value: number) => {
      this.count = value;
    });
  }

  goTo() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.count = 0;
  }
}
