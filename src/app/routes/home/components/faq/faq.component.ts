import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { faqSchema } from './faq.schema';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent implements OnInit {
  // TODO: hacer inject()
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    // Busca un script ya insertado con un identificador único
    const existing = this.document.head.querySelector(
      'script[type="application/ld+json"][data-faq="true"]'
    );

    if (!existing) {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-faq', 'true'); // etiqueta personalizada para identificarlo
      script.text = JSON.stringify(faqSchema);
      this.document.head.appendChild(script);
    }
  }
}
