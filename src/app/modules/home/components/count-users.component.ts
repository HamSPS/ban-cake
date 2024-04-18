import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-count-users',
  templateUrl: './count-users.component.html'
})
export class CountUsersComponent implements OnInit, OnDestroy {
  count: number = 0;

  private subscription!: Subscription;
  constructor(private reportsService: ReportsService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.reportsService.countUsers$.subscribe((value: number) => {
      this.count = value;
    });
  }

  goTo() {
    this.router.navigate(['/users'])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.count = 0;
  }
}
