// src/app/controllers/CreateAcc.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CreateAccController {
  createUser(id: string, password: string, email: string, role: string): Promise<User | null> {
    return User.CreateUser(id, password, email, role);
  }
}
