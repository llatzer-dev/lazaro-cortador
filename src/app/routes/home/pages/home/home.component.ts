import {
  ChangeDetectionStrategy,
  Component,
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

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ColeccionesComponent,
    ServiciosComponent,
    FaqComponent,
    AboutMeComponent,
  ],
  providers: [AutoDestroyService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly linkCanonical = 'https://lazarortega.com/';

  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateCanonicalLink(this.linkCanonical);
  }
}
