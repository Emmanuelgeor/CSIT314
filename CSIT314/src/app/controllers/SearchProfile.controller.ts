import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SearchProfileController {
  searchProfile(name: string): Promise<UserDetails[]> {
    return User.SearchProfile(name);
  }
}
