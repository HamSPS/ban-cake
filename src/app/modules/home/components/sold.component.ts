import { formatDate, formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/shared/services/reports.service';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.component.html'
})
export class SoldComponent implements OnInit {
  model: any = {};
  data: any[] = [];
  constructor(private reportsService: ReportsService) {}
  ngOnInit(): void {
    this.reportsService.sold$.subscribe((value: any[]) => {
      this.data = value;
    });
    this.initChart();
  }

  initChart(): void {
    let date: string[] = [];
    let data: any[] = [];
    if(this.data) {
      this.data.forEach((value: any) => {
        date.push(formatDate(value.date, 'dd/MM/yyyy', 'en'));
        data.push(value.total);
      });

      this.model = {
        labels: date,
        datasets: [
            {
                label: 'ຍອດຂາຍ',
                data: data,
                backgroundColor: ['rgba(153, 102, 255, 1)'],
                borderColor: ['rgb(153, 102, 255)'],
                borderWidth: 1
            }
        ]
    };
    }
  }
}
