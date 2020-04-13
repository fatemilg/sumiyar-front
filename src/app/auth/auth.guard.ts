import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token_service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private token_service: TokenService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.token_service.is_authenticated()) { // login karde bahe
      // var brows_url = window.location.href.split('/');
      // var lastSegment = brows_url.pop() 
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }

}
