import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRippleModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DisplayComponent } from './display/display.component';
import { DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';

@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsMaterialUIModule,
    MatCardModule,
  ],
  exports: [DisplayComponent],

})
export class DisplayFormModule { }
