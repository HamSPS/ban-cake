import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutsComponent } from './layouts.component';
import { TopbarComponent } from './components/topbar.component';
import { BadgeModule } from 'primeng/badge';
import { FooterComponent } from './components/footer.component';
import { SidebarComponent } from './components/sidebar.component';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    LayoutsComponent,
    TopbarComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    BadgeModule,
    ButtonModule,
    RippleModule
    // BrowserAnimationsModule
  ]
})
export class LayoutsModule { }
