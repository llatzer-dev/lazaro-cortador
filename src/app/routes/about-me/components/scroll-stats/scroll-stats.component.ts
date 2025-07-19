import { Component, signal } from '@angular/core';
import { Stat } from '@app/core/models/stat.model';
import { CountUpDirective } from '../../directive/count-up.directive';

@Component({
  selector: 'app-scrollstats',
  imports: [CountUpDirective],
  templateUrl: './scroll-stats.component.html',
  styleUrl: './scroll-stats.component.css',
})
export class ScrollStatsComponent {
  duration = signal(3000);

  stats = signal<Stat[]>([
    { label: 'Años de experiencia', value: 15, suffix: '+' },
    { label: 'Eventos al año', value: 150, suffix: '+' },
    { label: 'Valoraciones', value: 5, icon: 'star' },
    { label: 'Profesionalidad', value: 100, suffix: '%' },
  ]);
}
