import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormModule} from '../../projects/form-builder/src/lib/Formbuilder/form.module';
import {FormBuilderModule} from '../../projects/form-builder/src/lib/form-builder.module';
import {DisplayFormModule} from '../../projects/form-builder/src/lib/display-form/display-form.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormModule,
    FormBuilderModule,
    DisplayFormModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
