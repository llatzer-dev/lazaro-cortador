import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SocialIconComponent } from '../../icons/social-icon/social-icon.component';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, SocialIconComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menuOpen = signal(false);

  constructor() {}

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }
}
