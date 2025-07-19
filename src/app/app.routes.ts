import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const AppRoutes = {
  HOME: '',
  GALLERY: 'gallery',
};

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.HOME,
        loadComponent: () =>
          import('./routes/home/pages/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: AppRoutes.GALLERY,
        loadChildren: () =>
          import('./routes/gallery/gallery.routes').then(
            (m) => m.GALLERY_ROUTES
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME,
  },
];
