// src/app/controllers/SuspendAcc.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SuspendAccController {
  suspendAccount(id: string): Promise<User | null> {
    return User.SuspendAcc(id);
  }
}
