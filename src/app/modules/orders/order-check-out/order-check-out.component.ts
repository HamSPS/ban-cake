import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cart } from 'src/app/shared/interfaces/card.interface';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-check-out',
  templateUrl: './order-check-out.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OrderCheckOutComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  carts: Cart[] = [];
  submitted: boolean = false;

  minDate = new Date();

  constructor(
    private fb: UntypedFormBuilder,
    private cartService: CartService,
    private ordersService: OrdersService,
    private message: MessageService,
    private router: Router,
    private dialog: DynamicDialogRef

  ) {}

  get controls() {
    return this.formGroup.controls;
  }

  get summary(): number {
    let summary = 0;

    if (this.carts)
      summary = this.carts.reduce(
        (sum: number, value: Cart) => sum + value.price! * value.quantity!,
        0
      );
    return summary;
  }

  ngOnInit(): void {
    this.initForm();
    this.carts = this.cartService.getItems();
    this.checkItemLength();
  }

  initForm(): void {
    const rxweb = RxwebValidators;
    this.formGroup = this.fb.group({
      customerName: ['', rxweb.required()],
      tel: [
        '20',
        [
          rxweb.required(),
          rxweb.maxLength({ value: 10 }),
        ],
      ],
      address: ['', rxweb.required()],
      sendDate: ['', [rxweb.required(), rxweb.date()]],
    });
  }

  checkItemLength() {
    // const cartLength = this.cartService.getLength();
    // if (!cartLength) this.router.navigate(['/']);
  }

  onSave(): void {
    this.submitted = true;
    if (this.formGroup.invalid) return;
    this.formGroup.disable();
    const _details = this.cartService.getItems();

    const formData = {
      ...this.formGroup.value,
      details: _details,
    };

    this.ordersService.create(formData).subscribe({
      next: (values) => {
        if (values) {
          this.cartService.clearCart();
          setTimeout(() => {
            this.dialog.close();
            this.cartService.toggleSidebar();
            this.router.navigate(['/bills', values.id]);
          }, 1000);
        }
      },
      error: (err) => {
        const errMessage = err.errors.message;
        this.message.add({
          severity: 'danger',
          summary: 'Error',
          detail: errMessage,
        });
      },
    });
  }
}
