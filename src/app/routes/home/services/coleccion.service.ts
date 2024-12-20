import { Injectable } from '@angular/core';
import { Coleccion } from '@app/core/models/coleccion.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  private readonly IMG_PATH = 'img/colecciones';

  private coleccionesSubject: BehaviorSubject<Coleccion[]> =
    new BehaviorSubject<Coleccion[]>([
      {
        id: 1,
        imgUrl: `${this.IMG_PATH}/1.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 2,
        imgUrl: `${this.IMG_PATH}/FwZzOmNWIAIoM88.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 3,
        imgUrl: `${this.IMG_PATH}/FpAxINXaYAEEf_R.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 4,
        imgUrl: `${this.IMG_PATH}/F5XtKMAWcAAMrQH.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 5,
        imgUrl: `${this.IMG_PATH}/Fy2y49qWwAAwNz2.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 6,
        imgUrl: `${this.IMG_PATH}/Fy2y5itXwAcgIBc.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 7,
        imgUrl: `${this.IMG_PATH}/FOkWWzwWQAoBWOl.webp`,
        alt: 'Imagen Jamón Cortado',
      },
      {
        id: 8,
        imgUrl: `${this.IMG_PATH}/FfNwoQ2XkAICcSc.webp`,
        alt: 'Imagen Jamón Cortado',
      },
    ]);

  constructor() {}

  getColecciones(): Observable<Coleccion[]> {
    return this.coleccionesSubject.asObservable();
  }
}
