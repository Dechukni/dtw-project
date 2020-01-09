import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DTWComponent } from './dtw/dtw.component';
import { EditDistanceComponent } from './edit-distance/edit-distance.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DTWComponent,
    EditDistanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
