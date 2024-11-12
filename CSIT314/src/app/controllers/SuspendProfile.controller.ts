import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SuspendProfileController {
  suspendProfile(name: string): Promise<boolean> {
    return User.SuspendProfile(name);
  }
}
