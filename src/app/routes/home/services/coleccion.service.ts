import { Injectable } from '@angular/core';
import { Coleccion } from '@app/core/models/coleccion.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  private coleccionesSubject: BehaviorSubject<Coleccion[]> =
    new BehaviorSubject<Coleccion[]>([
      {
        id: 1,
        imgUrl: 'img/colecciones/1.webp',
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 2,
        imgUrl: 'img/colecciones/1.webp',
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 3,
        imgUrl: 'img/colecciones/1.webp',
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 4,
        imgUrl: 'img/colecciones/1.webp',
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 5,
        imgUrl: 'img/colecciones/1.webp',
        alt: 'Imagen Jamon Cortado',
      },
    ]);

  constructor() {}

  getColecciones(): Observable<Coleccion[]> {
    return this.coleccionesSubject.asObservable();
  }
}
