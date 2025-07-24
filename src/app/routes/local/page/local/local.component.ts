import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@app/core/services/common/seo.service';

@Component({
  selector: 'app-local',
  imports: [RouterLink],
  templateUrl: './local.component.html',
  styleUrl: './local.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalComponent {
  readonly localidad = input('', {
    transform: (value: string | undefined): string => {
      const slug = value?.replace(/^cortador-de-jamon-/, '') ?? '';
      return slug
        .split('-')
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ');
    },
  });

  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setBasicSeo({
      title: `Cortador de jamón en ${this.localidad()} - Lázaro Ortega`,
      description: `Servicio profesional de corte de jamón en ${this.localidad()}. Lázaro Ortega, cortador con más de 15 años de experiencia, disponible para bodas, eventos y celebraciones.`,
      keywords: `cortador de jamón en ${this.localidad()}, jamón ibérico, bodas en ${this.localidad()}, eventos, profesional, Alicante provincia, Lázaro Ortega Izquierdo, servicio de corte, cortador jamón`,
    });
  }
}
