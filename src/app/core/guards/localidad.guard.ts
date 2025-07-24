import { LOCALIDADES_VALIDAS } from '@app/constants/local-seo-cities';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LocalidadGuard implements CanActivate {
  localidadesValidas = LOCALIDADES_VALIDAS;

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
