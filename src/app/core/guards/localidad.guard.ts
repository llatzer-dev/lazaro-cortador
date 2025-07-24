import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalidadGuard implements CanActivate {
  localidadesValidas = [
    'cortador-de-jamon-alicante',
    'cortador-de-jamon-calpe',
    'cortador-de-jamon-javea',
  ];

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const localidad = route.paramMap.get('localidad');
    if (localidad && this.localidadesValidas.includes(localidad)) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
