import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoBasicData } from '@app/core/models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  readonly #meta = inject(Meta);
  readonly #title = inject(Title);

  constructor() {}

  setTitle(title: string): void {
    this.#title.setTitle(title);
  }

  setDescription(description: string): void {
    this.#meta.updateTag({ name: 'description', content: description });
  }

  setKeywords(keywords: string): void {
    this.#meta.updateTag({ name: 'keywords', content: keywords });
  }

  setBasicSeo({ title, description, keywords }: SeoBasicData) {
    this.setTitle(title);
    this.setDescription(description);
    if (keywords) {
      this.setKeywords(keywords);
    }
  }
}
