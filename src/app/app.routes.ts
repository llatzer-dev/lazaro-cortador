import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const AppRoutes = {
  HOME: {
    PATH: 'home',
    IMPORT: '@home/home.routes',
  },
};

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: AppRoutes.HOME.PATH,
        loadChildren: () =>
          import(AppRoutes.HOME.IMPORT).then((m) => m.HOME_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME.PATH,
  },
];
