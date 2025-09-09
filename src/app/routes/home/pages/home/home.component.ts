import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ColeccionesComponent } from '../../components/colecciones/colecciones.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import { FaqComponent } from '../../components/faq/faq.component';
import { SeoService } from '@app/core/services/common/seo.service';
import { AboutMeComponent } from '../../../about-me/pages/about-me/about-me.component';
import { DOCUMENT } from '@angular/common';
import { professionalServiceSchema } from './home.schema';
import { ScrollStatsComponent } from '@app/routes/about-me/components/scroll-stats/scroll-stats.component';
import { SocialIconComponent } from '@app/core/layout/icons/social-icon/social-icon.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ColeccionesComponent,
    ServiciosComponent,
    FaqComponent,
    ScrollStatsComponent,
    SocialIconComponent,
  ],
  providers: [AutoDestroyService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly linkCanonical = 'https://lazarortega.com/';
  isMainPage = true;

  private readonly seoService = inject(SeoService);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.seoService.updateCanonicalLink(this.linkCanonical);

    this.seoService.setBasicSeo({
      title: 'Cortador de Jamón Profesional en Alicante - Lázaro Ortega',
      description:
        'Cortador de Jamón Profesional en Alicante con más de 15 años de experiencia. Servicios para eventos, demostraciones y asesoramiento personalizado.',
      keywords:
        'jamón, cortador de jamón, profesional, Alicante, eventos, servicios, demostraciones, asesoramiento, experiencia, Lázaro Ortega',
    });

    // Busca un script ya insertado con un identificador único
    const existing = this.document.head.querySelector(
      'script[type="application/ld+json"][data-professionalservice="true"]'
    );

    if (!existing) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-professionalservice', 'true'); // etiqueta personalizada para identificarlo
      script.text = JSON.stringify(professionalServiceSchema);
      this.document.head.appendChild(script);
    }
  }
}
