import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ColeccionService } from '../../services/coleccion.service';
import { Coleccion } from '@app/core/models/coleccion.model';
import { Observable, of, takeUntil } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import { CheckPlatformUtility } from '@app/core/services/utils/check-platform.utility';
// @ts-ignore
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-colecciones',
  imports: [AsyncPipe, NgOptimizedImage],
  templateUrl: './colecciones.component.html',
  styleUrl: './colecciones.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColeccionesComponent
  implements OnInit, AfterContentInit, AfterViewInit
{
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

        // 👇 REGISTRO DE CAPTION
        lightbox.on('uiRegister', () => {
          lightbox.pswp.ui.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: '',
            onInit: (el: any, pswp: any) => {
              lightbox.pswp.on('change', () => {
                const currSlideElement = lightbox.pswp.currSlide?.data?.element;
                const altText =
                  currSlideElement?.querySelector('img')?.getAttribute('alt') ||
                  '';
                el.innerHTML = altText;
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
