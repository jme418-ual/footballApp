import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  while (!authService.initialized()) {
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  await router.navigate(['/login']);
  return false;
};