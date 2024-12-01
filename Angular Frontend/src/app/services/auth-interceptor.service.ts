// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { AuthServiceService } from './auth-service.service';


// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthServiceService);
//   const token = authService.getToken();

//   if (token) {
//     const clonedReq = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${token}`)
//     });
//     return next(clonedReq);
//   }

//   return next(req);
// };
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Token expired or invalid
          authService.logout();
          router.navigate(['/beforelog/login']);
        }
        return throwError(() => err);
      })
    );
  }

  return next(req);
};
