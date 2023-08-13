import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserRole } from '../../core/enums/user-role.enum';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  // Props
  authForm!: FormGroup;
  invalidUser!: boolean

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }




  get formControls() { return this.authForm.controls; }


  signIn() {
    this.invalidUser = false;
    if (this.authForm.invalid) {
      this.authForm.markAsTouched()
      return;
    }
    const isValidUser = this.authService.signIn(this.authForm.value);
    if (isValidUser) {
      switch (isValidUser?.role) {
        case UserRole.Admin:
          this.router.navigate(['home/admin-home']);
          break;
        case UserRole.User:
          this.router.navigate(['home/user-home']);
          break;
      }
    } else { this.invalidUser = true };

  }

}
