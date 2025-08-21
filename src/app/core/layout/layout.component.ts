import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    ScrollToTopComponent,
    MenuComponent,
    BreadcrumbComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
