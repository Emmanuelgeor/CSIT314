// src/app/controllers/ViewAcc.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ViewAccController {
  viewAccount(id: string): Promise<User | null> {
    return User.ViewAcc(id);
  }
}
