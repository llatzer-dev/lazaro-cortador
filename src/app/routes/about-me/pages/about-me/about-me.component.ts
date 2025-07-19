import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScrollStatsComponent } from '../../components/scroll-stats/scroll-stats.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ScrollStatsComponent],
  providers: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  constructor() {}
}
