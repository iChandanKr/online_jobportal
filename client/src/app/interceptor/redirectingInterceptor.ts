import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const toaster = inject(ToastrService);
  return next(req).pipe(
    tap({
      next: (event) => {},
      error: (err) => {
        if (err.error.status === 401) {
          toaster.error(err.error.message, 'error');
          router.navigate(['/login']);
        }
        if (err.error.status === 400 || 403) {
          toaster.error(err.error.message, 'error');
        }
      },
    })
  );
}
