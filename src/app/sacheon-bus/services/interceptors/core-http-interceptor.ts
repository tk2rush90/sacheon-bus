import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from '@sb/services/common/app.service';

@Injectable()
export class CoreHttpInterceptor implements HttpInterceptor {
  constructor(
    private appService: AppService,
  ) {
  }

  /**
   * Intercept the http request to add `browserKey` header.
   * @param req request
   * @param next next handler
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clone = req.clone({
      setParams: {
        browserKey: this.appService.browserKey,
      },
    });

    return next.handle(clone);
  }
}
