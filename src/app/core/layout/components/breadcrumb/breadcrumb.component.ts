import { DOCUMENT } from '@angular/common';
import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from '@app/core/services/common/breadcrumb.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb-schema',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #breadcrumbService = inject(BreadcrumbService);
  readonly #document = inject(DOCUMENT);

  ngOnInit() {
    this.insertBreadcrumbScript(this.#router.url);

    this.#router.events
      .pipe(
        filter(
          (event: any): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.insertBreadcrumbScript(event.urlAfterRedirects);
      });
  }

  private insertBreadcrumbScript(path: string) {
    const schema = this.#breadcrumbService.getBreadcrumbList(path);

    // Busca un script ya insertado con un identificador único
    let script = this.#document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"][data-breadcrumb="true"]'
    );

    if (!script) {
      script = this.#document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb', 'true'); // identificador único
      this.#document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema, null, 2);
  }
}
