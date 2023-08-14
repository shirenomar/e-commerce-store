import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "../services/loader.service";
import { Observable, finalize } from "rxjs";


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private loaderService: LoaderService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loaderService.show();

        return next.handle(request).pipe(
            finalize(() => this.loaderService.hide()),
        );
    }
}
