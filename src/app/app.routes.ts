import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { LocalComponent } from './routes/local/page/local/local.component';
import { LocalidadGuard } from './core/guards/localidad.guard';

export const AppRoutes = {
  HOME: '',
  GALLERY: 'galeria-fotos',
  ABOUT_ME: 'sobre-mi',
  EVENTS: 'cortador-de-jamon-eventos',
  LOGO: 'logo-cortador-jamon',
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
      {
        path: AppRoutes.ABOUT_ME,
        loadChildren: () =>
          import('./routes/about-me/about-me.routes').then(
            (m) => m.ABOUT_ME_ROUTES
          ),
      },
      {
        path: AppRoutes.EVENTS,
        loadChildren: () =>
          import('./routes/events/events.routes').then((m) => m.EVENTS_ROUTES),
      },
      {
        path: AppRoutes.LOGO,
        loadChildren: () =>
          import('./routes/logo/logo.routes').then((m) => m.LOGO_ROUTES),
      },
      {
        path: ':localidad',
        component: LocalComponent,
        canActivate: [LocalidadGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME,
  },
];
