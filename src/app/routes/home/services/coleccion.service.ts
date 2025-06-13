import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coleccion } from '@app/core/models/coleccion.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColeccionService {
  private readonly IMG_PATH = 'img/colecciones';
  private readonly JSON_PATH = 'json/colecciones.json';

  private coleccionesSubject: BehaviorSubject<Coleccion[]> =
    new BehaviorSubject<Coleccion[]>([]);

  constructor(private http: HttpClient) {
    this.loadColecciones();
  }

  private loadColecciones(): void {
    this.http
      .get<Coleccion[]>(this.JSON_PATH)
      .pipe(
        map((colecciones) => {
          const coleccionesConPath = colecciones.map((c, i) => ({
            ...c,
            imgUrl: `${this.IMG_PATH}/${c.imgUrl}`,
            alt: `${c.alt} ${i + 1}`,
          }));
          return coleccionesConPath;
        })
      )
      .subscribe({
        next: (coleccionesConPath) => {
          this.coleccionesSubject.next(coleccionesConPath);
        },
        error: (err) => {
          console.error('Error:', err);
          this.coleccionesSubject.next([]);
        },
      });
  }

  getColecciones(): Observable<Coleccion[]> {
    return this.coleccionesSubject.asObservable();
  }
}
