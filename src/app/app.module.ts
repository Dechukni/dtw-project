import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DTWComponent } from './dtw/dtw.component';
import { EditDistanceComponent } from './edit-distance/edit-distance.component';
import { FooterComponent } from './footer/footer.component';
import { HighlightDirective } from './directives/highlight.directive';
import { AbsPipe } from './pipes/abs.pipe';
import { MinimumPipe } from './pipes/minimum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DTWComponent,
    EditDistanceComponent,
    FooterComponent,
    HighlightDirective,
    AbsPipe,
    MinimumPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
