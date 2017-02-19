import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { FirerunsComponent } from "./fireruns/fireruns.component";
import { CalendarComponent} from "./calendar/calendar.component";
import { ProfileComponent} from "./profile/profile.component";
import { SettingsComponent} from "./settings/settings.component";
import { AddFirerunComponent} from "./add-firerun/add-firerun.component";

@NgModule({
    declarations: [
        AppComponent,
        FirerunsComponent,
        CalendarComponent,
        ProfileComponent,
        SettingsComponent,
        AddFirerunComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
