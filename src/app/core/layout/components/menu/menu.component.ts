import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { CheckPlatformUtility } from '@app/core/services/utils/check-platform.utility';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private platform = inject(CheckPlatformUtility);

  private isBrowser = this.platform.checkIfBrowser();
  scrolled = signal(false);
  menuOpen = signal(false);
  private width = signal(0);

  isDesktop = computed(() => this.width() >= 768);

  constructor() {
    if (this.isBrowser) {
      this.width.set(window.innerWidth);
      this.scrolled.set(window.scrollY > 10);
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.width.set(window.innerWidth);
    }
  }

  toggleMenu() {
    this.menuOpen.update((open) => !open);
  }
}
