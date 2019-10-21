import {Component, OnInit} from '@angular/core';
import {StateControlService} from '../services/state-control.service';

@Component({
  selector: 'ngx-fb-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  items = ['INPUT', 'EMAIL', 'FILE', 'PASSWORD', 'CHECKBOX', 'CHECKBOX_GROUP', 'RADIO_GROUP', 'SLIDER', 'TEXTAREA', 'SELECT'];
  tooltip = '';

  constructor(private stateFormService: StateControlService) {
  }

  ngOnInit() {

  }

  createFormControl(item) {
    const event = {
      type: 'addFormControl',
      payload: item,
      formData: ''
    };
    this.stateFormService.eventDispatcher.next(event);
  }

  tooltipMessage(item) {
    switch (item) {
      case 'INPUT':
        this.tooltip = 'This is an input';
        break;
      case 'EMAIL':
        this.tooltip = 'This is an email field';
        break;
      case 'FILE':
        this.tooltip = 'This is a file upload field';
        break;
      case 'PASSWORD':
        this.tooltip = 'This is a password field';
        break;
      case 'CHECKBOX':
        this.tooltip = 'This is a checkbox field';
        break;
      case 'RADIO_GROUP':
        this.tooltip = 'This is a  radio-group field';
        break;
      case 'CHECKBOX_GROUP':
        this.tooltip = 'This is a  checkbox-group field';
        break;
      case 'SLIDER':
        this.tooltip = 'This is a  slider field';
        break;
      case 'TEXTAREA':
        this.tooltip = 'This is a textarea field';
        break;
      case 'SELECT':
        this.tooltip = 'This is a select field';
        break;
    }
  }

}
