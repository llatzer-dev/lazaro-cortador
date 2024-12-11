import { Injectable } from '@angular/core';
import { Coleccion } from '@app/core/models/coleccion.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  readonly IMG_PATH = 'img/colecciones';

  private coleccionesSubject: BehaviorSubject<Coleccion[]> =
    new BehaviorSubject<Coleccion[]>([
      {
        id: 1,
        imgUrl: `${this.IMG_PATH}/1.webp`,
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 2,
        imgUrl: `${this.IMG_PATH}/FwZzOmNWIAIoM88.webp`,
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 3,
        imgUrl: `${this.IMG_PATH}/FpAxINXaYAEEf_R.webp`,
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 4,
        imgUrl: `${this.IMG_PATH}/1.webp`,
        alt: 'Imagen Jamon Cortado',
      },
      {
        id: 5,
        imgUrl: `${this.IMG_PATH}/1.webp`,
        alt: 'Imagen Jamon Cortado',
      },
    ]);

  constructor() {}

  getColecciones(): Observable<Coleccion[]> {
    return this.coleccionesSubject.asObservable();
  }
}
