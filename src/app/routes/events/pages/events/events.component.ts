import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@app/core/services/common/seo.service';

@Component({
  selector: 'app-events',
  imports: [RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setBasicSeo({
      title: 'Cortador de Jamón Profesional para Eventos - Lázaro Ortega',
      description:
        'Cortador de Jamón para Eventos con más de 15 años de experiencia. Lázaro Ortega ofrece un servicio profesional de corte en directo ideal para bodas, celebraciones y eventos corporativos.',
      keywords:
        'cortador de jamón para eventos, celebraciones, servicio de corte, jamón ibérico, cortador profesional, eventos privados, jamón en vivo, Lázaro Ortega Izquierdo',
    });
  }
}
