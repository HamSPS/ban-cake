import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsRoutingModule } from './bills-routing.module';
import { BillTemplateComponent } from './bill-template/bill-template.component';
import { BillDialogComponent } from './bill-template/components/bill-dialog.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    BillTemplateComponent,
    BillDialogComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule,
    ButtonModule,
  ]
})
export class BillsModule { }
