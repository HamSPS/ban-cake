import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'ສ້າງອໍເດີ',
        icon: 'pi pi-plus',
        routerLink: ['/order/create'],
        styleClass: 'bg-green-400 text-white'
      },
      {
        label: 'ລາຍການ',
        icon: 'pi pi-table',
        routerLink: ['/order/list'],
        styleClass: 'bg-amber-400 text-white'
      },
      {
        label: 'ສິນຄ້າ',
        icon: 'pi pi-bars',
        routerLink: ['/products'],
        styleClass: 'bg-red-400 text-white'
      },
      {
        label: 'ຜູ້ໃຊ້',
        icon: 'pi pi-users',
        routerLink: ['/order'],
        styleClass: 'bg-sky-400 text-white'
      }
    ]
  }
}
