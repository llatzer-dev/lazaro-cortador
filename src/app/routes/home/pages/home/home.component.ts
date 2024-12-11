import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ColeccionesComponent } from '../../components/colecciones/colecciones.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, ColeccionesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
