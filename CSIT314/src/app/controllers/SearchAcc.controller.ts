// src/app/controllers/SearchAcc.controller.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SearchAccController {
  searchAccount(id: string): Promise<User[]> {
    return User.SearchAcc(id);
  }
}
