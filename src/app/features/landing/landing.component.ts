import { Component } from '@angular/core';
import { AuthService } from '../user-auth/services/auth.service';
import { Router } from '@angular/router';
import { HomeUtils } from 'src/app/shared/utils/home.utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent {
  constructor(private authService: AuthService, private router: Router) { }

  opened: boolean = true;
  homeLinks = HomeUtils.Links;

  toggle(): void {
    this.opened = !this.opened;
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(["/login"])
  }


}
