import { Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { CreateProfileComponent } from './views/create-profile/create-profile.component';
import { ViewProfileComponent } from './views/view-profile/view-profile.component';
import { UpdateProfileComponent } from './views/update-profile/update-profile.component';
import { SuspendProfileComponent } from './views/suspend-profile/suspend-profile.component';
import { SearchProfileComponent } from './views/search-profile/search-profile.component';
import { LogoutComponent } from './views/logout/logout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },                 // Login route
    { path: 'create-profile', component: CreateProfileComponent }, // Create Profile route
    { path: 'view-profile/:id', component: ViewProfileComponent }, // View Profile route (dynamic ID)
    { path: 'update-profile/:id', component: UpdateProfileComponent }, // Update Profile route (dynamic ID)
    { path: 'suspend-profile', component: SuspendProfileComponent },   // Suspend Profile route
    { path: 'search-profile', component: SearchProfileComponent },     // Search Profile route
    { path: 'logout', component: LogoutComponent },                    // Logout route
];
