import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/user-auth/services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../enums/user-role.enum';

export const AuthAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const user = authService.getUserData();

  return !!user && user.role == UserRole.Admin;
};
