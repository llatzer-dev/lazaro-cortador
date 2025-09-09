import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ScrollStatsComponent } from '../../components/scroll-stats/scroll-stats.component';
import { SeoService } from '@app/core/services/common/seo.service';
import { SocialIconComponent } from '@app/core/layout/icons/social-icon/social-icon.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ScrollStatsComponent, SocialIconComponent],
  providers: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent implements OnInit {
  isMainPage = input<boolean>(false);
  private readonly seoService = inject(SeoService);

  constructor() {}

  ngOnInit(): void {
    if (!this.isMainPage()) {
      this.seoService.setBasicSeo({
        title: 'Sobre mí - Lázaro Ortega',
        description:
          'Conoce a Lázaro Ortega, cortador de jamón profesional con más de 15 años de experiencia en eventos para empresas, bodas y celebraciones en Alicante.',
        keywords:
          'sobre mí, cortador de jamón, profesional, eventos, empresas, Alicante, Lázaro Ortega Izquierdo, experiencia, jamón ibérico, servicio de corte',
      });
    }
  }
}
