import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  NgZone,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Coleccion } from '@app/core/models/coleccion.model';
import { ColeccionService } from '@app/core/services/common/coleccion.service';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import { CheckPlatformUtility } from '@app/core/services/utils/check-platform.utility';
import { Observable, of, takeUntil } from 'rxjs';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [AsyncPipe, NgOptimizedImage, RouterLink],
  providers: [AutoDestroyService],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  colecciones$: Observable<Coleccion[]> = of([]);
  private checkPlatform = inject(CheckPlatformUtility);

  // @ViewChild('masonryGrid', { static: false }) masonryGrid!: ElementRef;
  @ViewChild('masonryGallery', { static: false }) masonryGallery!: ElementRef;

  constructor(
    private readonly coleccionService: ColeccionService,
    private readonly destroy$: AutoDestroyService,
    private ngZone: NgZone
  ) {}

  ngAfterContentInit(): void {
    if (this.checkPlatform.checkIfBrowser()) {
      this.ngZone.runOutsideAngular(() => {
        const lightbox = new PhotoSwipeLightbox({
          gallery: '#gallery--getting-started',
          children: 'a',

          closeTitle: 'Cerrar',
          zoomTitle: 'Enfocar la foto',
          arrowPrevTitle: 'Ir a la anterior foto',
          arrowNextTitle: 'Ir a la siguiente foto',
          errorMsg: 'La foto no se ha podido cargar',
          indexIndicatorSep: ' de ',

          wheelToZoom: true,

          pswpModule: PhotoSwipe,
        });

        // Mensaje personalizado por imagen
        lightbox.on('uiRegister', () => {
          lightbox.pswp.ui.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: '',
            onInit: (el: any, pswp: any) => {
              // Inicialmente oculto
              el.style.opacity = '0';

              lightbox.pswp.on('change', () => {
                const currSlideElement = lightbox.pswp.currSlide?.data?.element;
                const altText =
                  currSlideElement
                    ?.querySelector('img')
                    ?.getAttribute('alt')
                    ?.trim() || '';

                if (altText) {
                  el.innerHTML = altText;
                  el.style.opacity = '1';
                } else {
                  el.style.opacity = '0';
                }
              });
            },
          });
        });

        lightbox.init();
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.checkPlatform.checkIfBrowser()) {
      this.ngZone.runOutsideAngular(async () => {
        // @ts-ignore
        const Masonry = (await import('masonry-layout')).default;

        new Masonry(this.masonryGallery.nativeElement, {
          itemSelector: '.grid-item',
          columnWidth: 200,
          gutter: 20,
        });
      });
    }
  }

  ngOnInit(): void {
    this.colecciones$ = this.coleccionService
      .getColecciones()
      .pipe(takeUntil(this.destroy$));
  }
}
