import { Component, OnInit } from '@angular/core';
import { LayoutsService } from '../services/layouts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  isToggle!: boolean;
  isVisible!: boolean;
  constructor(private layoutsService: LayoutsService) {}

  ngOnInit(): void {
      this.layoutsService.toggleMenu$.subscribe((value: boolean) => {
        this.isToggle = value;
      });
      this.layoutsService.toggleSidebar$.subscribe((value: boolean) => {
        this.isVisible = value;
      });
  }

  visible() {
    this.layoutsService.visible();
  }
}
