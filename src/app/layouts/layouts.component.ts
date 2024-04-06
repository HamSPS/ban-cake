import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LayoutsService } from './services/layouts.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutsComponent implements OnInit {
  isToggle!: boolean;
  constructor(private layoutsService: LayoutsService) {}

  ngOnInit(): void {
      this.layoutsService.toggleMenu$.subscribe((value: boolean) => {

(value);
        this.isToggle = value;
      });
  }
}
