import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-fb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, AfterViewInit {
  showForm = false;
  formGroup: FormGroup;
  formModel: DynamicFormModel = [];
  pocChange: number;
  showFile = false;
  buttonFile: {
    id: '',
    label: ''
  };
  listId = [];

  @Input() formModelexport : DynamicFormModel = [];

  constructor(
    // private router: Router,
    //           private route: ActivatedRoute,
              private formService: DynamicFormService,
              private stateControlService: StateControlService,
            ) {

  }

  ngOnInit() {
    // this.route.queryParams.subscribe(existData => {
    //   console.log(existData);
    //   this.formModel = [];
    //   if (existData.uploadID) {
    //     this.showFile = true;
    //     this.buttonFile = {
    //       id: existData.uploadID,
    //       label: existData.uploadLabel
    //     };
    //   }
    //   if (existData.form !== '') {
    //     this.formModel = this.formService.fromJSON(existData.form);
    //     this.findAllId();
    //     this.stateControlService.idList.next(this.listId);
    //   }
    //   console.log(this.formModel);
    //   this.formGroup = this.formService.createFormGroup(this.formModel);
    //   this.showForm = true;
    // });
  }

  ngAfterViewInit() {
    this.stateControlService.formModel.subscribe(data => {
      this.controlForUplaodButton(data);
      this.formGroup = this.formService.createFormGroup(this.formModel);
      this.showForm = true;
    });
    this.stateControlService.edit.subscribe(edit => {
      this.formModel[this.pocChange] = edit;
      this.formGroup = this.formService.createFormGroup(this.formModel);
    });
  }

  controlDetails(controlModel) {
    const event = {
      type: 'addFormControl',
      payload: controlModel
    };
    this.pocChange = this.formModel.indexOf(controlModel);
    this.stateControlService.eventDispatcher.next(event);
  }

  save(formModel) {
    this.showFile = false;
    this.formModelexport = formModel;
    // this.localStorageService.newform.next({
    //   form: JSON.stringify(formModel),
    //   uploadID: this.buttonFile.id,
    //   uploadLabel: this.buttonFile.label
    // // });
    this.formModel = [];
    // this.router.navigate(['all-forms']);
  }

  controlForUplaodButton(data) {
    this.buttonFile = {
      id: data.id,
      label: data.label
    };
    console.log(this.buttonFile);
    if (data.inputType === 'file') {
      this.showFile = true;
    } else {
      this.formModel.push(data);
    }
  }

  deleteOption(controlModel) {
    this.pocChange = this.formModel.indexOf(controlModel);
    this.formModel.splice(this.pocChange, 1);
  }

  findAllId() {
    this.formModel.map(el => {
      this.listId.push(el.id);
    });
    if (this.buttonFile.id !== '') {
      this.listId.push(this.buttonFile.id);
    }
  }
}
