import { RenderMode, ServerRoute } from '@angular/ssr';
import { LOCALIDADES_VALIDAS } from './constants/local-seo-cities';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':localidad',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return LOCALIDADES_VALIDAS.map((localidad) => ({ localidad }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
