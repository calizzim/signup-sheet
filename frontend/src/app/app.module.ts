import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupSheetComponent } from './components/signup-sheet/signup-sheet.component';
import { McalizziFormComponent } from './components/mcalizzi-form/mcalizzi-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupSheetComponent,
    McalizziFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
