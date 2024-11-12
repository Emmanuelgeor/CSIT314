import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessLogoutController {
  processLogout(): boolean {
    return User.processLogout();
  }
}
