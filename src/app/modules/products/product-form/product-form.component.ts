import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ReactiveFormConfig, RxwebValidators, error } from '@rxweb/reactive-form-validators';
import { Product } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  showDialog: boolean = false;
  submitted: boolean = false;

  product: Product = {};
  header: string = '';

  response: any = {
    next: (res: any) => {
        if(res) {
          this.onHideDialog();
        }
    },
    error: (err: any) => {
      this.formGroup.enable();

(err)
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private productsService: ProductsService,
    private utils: UtilsService
  ) {
    ReactiveFormConfig.set(this.utils.validationMessage);
  }
  ngOnInit(): void {
    const rxweb = RxwebValidators;
    this.formGroup = this.fb.group({
      code: [null],
      name: [null, rxweb.required()],
      cost: [null, [rxweb.required(), rxweb.numeric({ isFormat: false })]],
      price: [null, [rxweb.required(), rxweb.numeric({ isFormat: false })]],
    });
  }

  onShowDialog(): void {
    if (this.product) {
      const value = {
        code: this.product.code,
        name: this.product.name,
        cost: this.product.cost,
        price: this.product.price,
      };
      this.formGroup.patchValue(value);
    } else {
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.invalid) return;

    const id = this.product.id;
    const formData = this.formGroup.value;

    this.formGroup.disable();
    id
      ? this.productsService.update(id, formData).subscribe(this.response)
      : this.productsService.create(formData).subscribe(this.response);
  }

  onHideDialog(): void {
    this.formGroup.reset();
    this.formGroup.enable();
    this.showDialog = false;
    this.product = {};
  }
}
