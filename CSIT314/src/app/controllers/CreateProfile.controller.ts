import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CreateProfileController {
  createProfile(id: string, name: string, hp: number, preference: string, age: number): Promise<boolean> {
    return User.CreateProfile(id, name, hp, preference, age);
  }
}
