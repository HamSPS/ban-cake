import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillTemplateComponent } from './bill-template/bill-template.component';

const routes: Routes = [
  {
    path: ':id', component: BillTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillsRoutingModule { }
