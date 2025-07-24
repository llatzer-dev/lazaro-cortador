import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':localidad',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return [
        { localidad: 'cortador-de-jamon-alicante' },
        { localidad: 'cortador-de-jamon-calpe' },
        { localidad: 'cortador-de-jamon-javea' },
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
