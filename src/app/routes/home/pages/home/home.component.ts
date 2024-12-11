import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ColeccionesComponent } from '../../components/colecciones/colecciones.component';
import { ServiciosComponent } from '../../components/servicios/servicios.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ColeccionesComponent, ServiciosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
