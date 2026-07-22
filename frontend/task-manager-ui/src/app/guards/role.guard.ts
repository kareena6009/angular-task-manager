import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const router = inject(Router);

  const role =
    localStorage.getItem('role');

  const allowedRoles =
    route.data?.['roles'] as string[];

  if (
    role &&
    allowedRoles.includes(role)
  ) {

    return true;

  }

  router.navigate(['/dashboard']);

  return false;

};