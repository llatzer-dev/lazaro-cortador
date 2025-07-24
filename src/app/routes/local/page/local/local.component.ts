import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '@app/core/services/common/seo.service';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrl: './local.component.css',
})
export class LocalComponent {
  localidad = '';

  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    const raw = this.route.snapshot.paramMap.get('localidad') || '';
    const ciudadSlug = raw.replace(/^cortador-de-jamon-/, '');
    this.localidad = this.capitalizar(ciudadSlug);

    this.seoService.setBasicSeo({
      title: `Cortador de jamón en ${this.localidad} - Lázaro Ortega`,
      description: `Servicio profesional de corte de jamón en ${this.localidad}. Lázaro Ortega, cortador con más de 15 años de experiencia, disponible para bodas, eventos y celebraciones.`,
      keywords: `cortador de jamón en ${this.localidad}, jamón ibérico, bodas en ${this.localidad}, eventos, profesional, Alicante, Lázaro Ortega Izquierdo, servicio de corte, cortador jamón`,
    });
  }

  private capitalizar(texto: string): string {
    return texto
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  }
}
