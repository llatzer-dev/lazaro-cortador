import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SeoService } from '@app/core/services/common/seo.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LogoComponent implements OnInit {
  private readonly linkCanonical =
    'https://lazarortega.com/logo-cortador-jamon';

  private readonly seoService = inject(SeoService);

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.seoService.updateCanonicalLink(this.linkCanonical);

    this.seoService.setBasicSeo({
      title: 'Logo Cortador de Jamón - Lázaro Ortega',
      description:
        'Descubre el logo exclusivo de Lázaro Ortega, cortador de jamón profesional en Alicante. Diseño único y representativo de su experiencia y calidad.',
      keywords: 'logo cortador de jamón, diseño logo jamón, Lázaro Ortega',
    });

    // Añadir JSON-LD para datos estructurados del logo
    const existingLogoSchema = this.document.head.querySelector(
      'script[type="application/ld+json"][data-logo="true"]'
    );

    if (!existingLogoSchema) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-logo', 'true');
      script.text = JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        url: 'https://lazarortega.com/img/lazaro-ortega/lazaro-logo-cortador-de-jamon.webp',
        name: 'Logo Cortador de Jamón - Lázaro Ortega',
        author: {
          '@type': 'Person',
          name: 'Lázaro Ortega',
        },
        description:
          'Logo exclusivo que representa la dedicación y profesionalismo de Lázaro Ortega como cortador de jamón.',
      });
      this.document.head.appendChild(script);
    }
  }
}
