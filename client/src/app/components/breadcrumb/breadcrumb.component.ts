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
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: Breadcrumb[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      });

    // Initialize breadcrumbs
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
    // Get the label for this route if one exists
    const label = route.snapshot.data['breadcrumb'];
    const path = route.snapshot.url.map(segment => segment.path).join('/');
    
    // Get any dynamic parameters from the route
    const params = route.snapshot.params;
    let paramLabel = '';
    
    // Add parameter information to the label if it exists
    if (Object.keys(params).length > 0) {
      paramLabel = ` (${Object.values(params).join(', ')})`;
    }
    
    const nextUrl = path ? `${url}/${path}` : url;

    // Add breadcrumb if a label exists
    if (label) {
      breadcrumbs.push({
        label: label + paramLabel,
        url: nextUrl
      });
    }

    // If there are child routes, recursively build their breadcrumbs
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

  // Helper method to determine if a breadcrumb is the last one
  isLast(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }

  // Navigate to the specified URL
  navigate(url: string): void {
    this.router.navigate([url]);
  }
}
