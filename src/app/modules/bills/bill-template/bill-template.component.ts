import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/shared/interfaces/orders.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import html2canvas from 'html2canvas';
import { formatDate } from '@angular/common';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-bill-template',
  templateUrl: './bill-template.component.html',
  styleUrls: ['./bill-template.component.scss'],
})
export class BillTemplateComponent implements OnInit {
  @ViewChild('bill') bill!: ElementRef;
  order!: Order;

  private unsubscribeAll: Subject<any> = new Subject();
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  get summary(): number {
    let summary = 0;
    const _details = this.order.details;

    if(_details) {
      summary = _details.reduce((sum, value) => sum + (value.price! * value.quantity!), 0);
    }
    return summary;
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.ordersService.findOne(id).subscribe();
    this.ordersService.order$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((value: Order | null) => {
        if (value) this.order = value;
      });
  }

  downloadImg() {
    const img = this.bill.nativeElement;

    // const element = html.nativeElement;
        html2canvas(img).then((canvas) => {
            canvas.toBlob((blob: any) => {
                const currentTime = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');
                // window.saveAs(blob, `bill_${currentTime}.png`);
                // const img = new Blob(blob, { type: 'application/octet-stream' });
                saveAs(blob, `bill_${currentTime}.jpeg`);
            }, "image/jpeg");
            //     const currentTime = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

            // saveAs(canvas.toDataURL("image/jpg"), `bill.jpg`);
            // const blob = new Blob(canvas, {type: 'application/octet-stream'});
        }).catch((error) => {
          console.error('Error capturing or saving image:', error);
        });


  }
}
