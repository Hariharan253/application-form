import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "./admin.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private adminService: AdminService, private rotuer: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const auth = this.adminService.getUserIsAuthenticated();
        if(!auth) {
            this.rotuer.navigate(['/admin/login']);
        }
        return auth;
    }
}