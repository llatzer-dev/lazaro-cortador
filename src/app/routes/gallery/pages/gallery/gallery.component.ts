import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColeccionService } from '@app/core/services/common/coleccion.service';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import { MasonryComponent } from '@app/routes/gallery/components/masonry/masonry.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, MasonryComponent],
  providers: [AutoDestroyService],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  private readonly coleccionService = inject(ColeccionService);

  readonly colecciones = toSignal(this.coleccionService.getColecciones(), {
    initialValue: [],
  });
}
