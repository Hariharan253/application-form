import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminService } from "../admin/admin.service";


@Injectable()
export class AdminInterceptor implements HttpInterceptor {

    constructor(private adminService: AdminService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.adminService.getToken();

        const authRequest = req.clone({ //syntax to clone the outgoing request
            headers: req.headers.set("Authorization", `Bearer ${token}`) //syntax for setting the header
        });

        return next.handle(authRequest);
    }
}