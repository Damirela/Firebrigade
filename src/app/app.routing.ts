/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { FirerunsComponent } from './fireruns/fireruns.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AddFirerunComponent } from './add-firerun/add-firerun.component';


export const ROUTES: Routes = [
    {path: '', redirectTo: 'fireruns', pathMatch: 'full'},
    {path: 'fireruns', component: FirerunsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'add-firerun', component: AddFirerunComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
