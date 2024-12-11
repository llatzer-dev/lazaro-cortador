import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ColeccionService } from '../../services/coleccion.service';
import { Coleccion } from '@app/core/models/coleccion.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-colecciones',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './colecciones.component.html',
  styleUrl: './colecciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColeccionesComponent implements OnInit {
  colecciones$: Observable<Coleccion[]> = of([]);

  constructor(private readonly coleccionService: ColeccionService) {}

  ngOnInit(): void {
    this.colecciones$ = this.coleccionService.getColecciones();
  }
}
