import { Injectable } from '@angular/core';
import { AppRoutes } from '@app/app.routes';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  // Mapea las rutas con su nombre para mostrar en las migas
  private routeNames: Record<string, string> = {
    [AppRoutes.HOME]: 'Inicio',
    [AppRoutes.GALLERY]: 'Galería de fotos sobre Cortes de Jamón',
    [AppRoutes.ABOUT_ME]: 'Sobre mí',
    [AppRoutes.EVENTS]: 'Cortador de Jamón en Eventos',
  };

  getBreadcrumbList(currentPath: string) {
    const parts = currentPath.split('/').filter((p) => p); // dividir la ruta
    const itemListElement = parts.map((_, index) => {
      const path = parts.slice(0, index + 1).join('/'); // sin barra inicial
      const isLast = index === parts.length - 1; // detectar si es la página actual
      return {
        '@type': 'ListItem',
        position: index + 2, // +2 porque Inicio siempre será posición 1
        name:
          this.routeNames[path] ||
          parts[index]
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase()),
        ...(isLast ? {} : { item: `https://lazarortega.com/${path}` }),
      };
    });

    // añadir inicio siempre
    itemListElement.unshift({
      '@type': 'ListItem',
      position: 1,
      name: this.routeNames[AppRoutes.HOME],
      item: 'https://lazarortega.com/',
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement,
    };
  }
}
