import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { filter, Subscription, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  subscription: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(
        filter(
          (event: Event): event is NavigationEnd =>
            event instanceof NavigationEnd
        ),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      });

    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const label = route.snapshot.data['breadcrumb'];
    const path = route.snapshot.url.map((segment) => segment.path).join('/');

    const params = route.snapshot.params;
    let paramLabel = '';

    if (Object.keys(params).length > 0) {
      paramLabel = ` (${Object.values(params).join(', ')})`;
    }

    const nextUrl = path ? `${url}/${path}` : url;

    if (label) {
      breadcrumbs.push({
        label: label,
        url: nextUrl,
      });
    }

    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  isLast(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }
}
