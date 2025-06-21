import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoBasicData } from '@app/core/models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  readonly #meta = inject(Meta);
  readonly #title = inject(Title);
  readonly #document = inject(DOCUMENT);
  readonly #rendererFactory = inject(RendererFactory2);
  readonly #renderer: Renderer2;

  constructor() {
    this.#renderer = this.#rendererFactory.createRenderer(null, null);
  }

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

  updateCanonicalLink(newCanonicalUrl: string) {
    const existingLink: HTMLLinkElement | null = this.#document.querySelector(
      'link[rel="canonical"]'
    );

    if (existingLink) {
      this.#renderer.setAttribute(existingLink, 'href', newCanonicalUrl);
    } else {
      const link = this.#renderer.createElement('link');
      this.#renderer.setAttribute(link, 'rel', 'canonical');
      this.#renderer.setAttribute(link, 'href', newCanonicalUrl);
      this.#renderer.appendChild(this.#document.head, link);
    }
  }
}
