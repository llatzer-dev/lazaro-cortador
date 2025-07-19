import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ColeccionService } from '../../../../core/services/common/coleccion.service';
import { RouterLink } from '@angular/router';
import { MasonryComponent } from '../../../gallery/components/masonry/masonry.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-colecciones',
  imports: [RouterLink, MasonryComponent],
  templateUrl: './colecciones.component.html',
  styleUrl: './colecciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColeccionesComponent {
  private readonly coleccionService = inject(ColeccionService);

  readonly colecciones = toSignal(
    this.coleccionService.getPrimerasColecciones(),
    {
      initialValue: [],
    }
  );
}
