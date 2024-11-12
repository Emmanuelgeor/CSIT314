import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ViewProfileController {
  viewProfile(id: string): Promise<UserDetails | null> {
    return User.ViewProfile(id);
  }
}
