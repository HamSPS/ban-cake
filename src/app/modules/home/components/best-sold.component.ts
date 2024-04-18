import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-best-sold',
  templateUrl: './best-sold.component.html'
})
export class BestSoldComponent implements OnInit, OnDestroy {
  bestSold: any[] = [];

  private subscription!: Subscription;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.subscription = this.reportsService.bestSold$.subscribe((value: any[]) => {
      this.bestSold = value;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.bestSold = [];
  }
}
