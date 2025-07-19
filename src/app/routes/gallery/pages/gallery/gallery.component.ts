import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ColeccionService } from '@app/core/services/common/coleccion.service';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import { MasonryComponent } from '@app/routes/gallery/components/masonry/masonry.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeoService } from '@app/core/services/common/seo.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, MasonryComponent],
  providers: [AutoDestroyService],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit {
  private readonly linkCanonical = 'https://lazarortega.com/gallery/';

  private readonly coleccionService = inject(ColeccionService);
  private readonly seoService = inject(SeoService);

  readonly colecciones = toSignal(this.coleccionService.getColecciones(), {
    initialValue: [],
  });

  constructor() {}

  ngOnInit(): void {
    this.seoService.setBasicSeo({
      title: 'Galería de fotos sobre Cortes de Jamón - Lázaro Ortega',
      description:
        'Explora la galería de jamones cortados profesionalmente por Lázaro Ortega en Alicante.',
      keywords:
        'jamón, corte, galería de fotos, Lázaro Ortega Izquierdo, cortador de jamón profesional, cortador en Alicante',
    });

    // this.seoService.updateCanonicalLink(this.linkCanonical);
  }
}
