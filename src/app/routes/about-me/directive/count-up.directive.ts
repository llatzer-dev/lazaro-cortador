import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { AutoDestroyService } from '@app/core/services/utils/auto-destroy.service';
import {
  animationFrameScheduler,
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  endWith,
  interval,
  map,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs';

import { CheckPlatformUtility } from '@app/core/services/utils/check-platform.utility';

/**
 * Quadratic Ease-Out Function: f(x) = x * (2 - x)
 */
const easeOutQuad = (x: number): number => x * (2 - x);

@Directive({
  selector: '[countUp]',
  providers: [AutoDestroyService],
})
export class CountUpDirective implements OnInit, OnDestroy {
  private readonly count$ = new BehaviorSubject(0);
  private readonly duration$ = new BehaviorSubject(2000);
  private observer: IntersectionObserver | null = null;

  private readonly currentCount$ = combineLatest([
    this.count$,
    this.duration$,
  ]).pipe(
    switchMap(([count, duration]) => {
      const startTime = animationFrameScheduler.now();

      return interval(0, animationFrameScheduler).pipe(
        map(() => animationFrameScheduler.now() - startTime),
        map((elapsedTime) => elapsedTime / duration),
        takeWhile((progress) => progress <= 1),
        map(easeOutQuad),
        map((progress) => Math.round(progress * count)),
        endWith(count),
        distinctUntilChanged()
      );
    })
  );

  @Input('countUp')
  set count(count: number) {
    this.count$.next(count);
  }

  @Input()
  set duration(duration: number) {
    this.duration$.next(duration);
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly autoDestroy$: AutoDestroyService,
    private readonly platformUtil: CheckPlatformUtility
  ) {}

  ngOnInit(): void {
    if (this.platformUtil.checkIfBrowser()) {
      this.setupObserver();
    } else {
      // En servidor simplemente muestra el valor estático sin animar
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'innerHTML',
        this.count$.value
      );
    }
  }

  private setupObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      // fallback si no existe IntersectionObserver
      this.displayCurrentCount();
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.displayCurrentCount();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  private displayCurrentCount(): void {
    this.currentCount$
      .pipe(takeUntil(this.autoDestroy$))
      .subscribe((currentCount) => {
        this.renderer.setProperty(
          this.elementRef.nativeElement,
          'innerHTML',
          currentCount
        );
      });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
