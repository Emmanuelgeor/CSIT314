// src/app/controllers/UpdateAcc.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateAccController {
  updateAccount(id: string, password: string, email: string, role: string): Promise<User | null> {
    return User.UpdateAcc(password, email, role, id);
  }
}
