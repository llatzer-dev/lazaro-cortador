import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const AppRoutes = {
  HOME: 'home',
};

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.HOME,
        loadChildren: () =>
          import('./routes/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: '',
        redirectTo: AppRoutes.HOME,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME,
  },
];
