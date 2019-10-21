import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonStructure} from './models/JsonStructure';
// temp
import {ActivatedRoute, Router} from '@angular/router';
// temp
import {FormGroup} from '@angular/forms';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';

@Component({
  selector: 'ngx-fb-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, AfterViewInit {
  showFile = false;
  buttonLabel = '';
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  formData: JsonStructure;
  formname = '';

  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() submitted: EventEmitter<any> = new EventEmitter();


  constructor(
    private formService: DynamicFormService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.queryParams.subscribe(existData => {
      console.log(existData.form);
      if (existData.upload !== '') {
        this.showFile = true;
        this.buttonLabel = existData.upload;
      }
      this.formData = existData;
      this.formModel = [];
      this.formModel = formModelexport;
      this.showForm = true;
      this.formGroup = this.formService.createFormGroup(this.formModel);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  addBlurEvent(event) {
    this.blur.next(event);
  }

  addChangeEvent(event) {
    this.change.next(event);
  }

  addFocusEvent(event) {
    this.focus.next(event);
  }

  addSubmitEvent(event) {
    this.focus.next(event);
  }

  submit(data) {
    console.log(data);
    this.router.navigate(['all-forms']);
  }
}
