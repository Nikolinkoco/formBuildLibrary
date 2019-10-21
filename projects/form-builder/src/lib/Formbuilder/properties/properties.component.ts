import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DynamicFormArrayModel, DynamicFormModel, DynamicFormService, MATCH_DISABLED, MATCH_HIDDEN} from '@ng-dynamic-forms/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {StateControlService} from '../services/state-control.service';

@Component({
  selector: 'ngx-fb-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements AfterViewInit, OnInit {
  hasOptions = true;
  related = false;
  formGroup: FormGroup;
  relations: FormGroup;
  formModel: DynamicFormModel = [];
  showForm = false;
  formArrayControl: FormArray;
  formArrayModel;
  listId = [];

  constructor(private formService: DynamicFormService,
              private stateControlService: StateControlService,
              private cd: ChangeDetectorRef) {
    this.formModel = [];
    this.relations = new FormGroup({
      relatedOption: new FormControl(''),
      relatedId: new FormControl(''),
      relatedValue: new FormControl(''),
    });
  }

  ngOnInit() {
    this.stateControlService.idList.subscribe(list => {
      this.listId = list;
    });
    this.stateControlService.updateContent.subscribe(res => {
      this.formModel = [];
      this.related = false;
      this.setOptions('', '', '');
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
    this.stateControlService.dataModel.subscribe(data => {
      this.formGroup = this.formService.createFormGroup(data[0]);
      this.formModel = data[0];
      this.formArrayControl = this.formGroup.get('options') as FormArray;
      this.formArrayModel = this.formService.findById('options', this.formModel);
      this.showForm = true;
      this.hasOptions = this.formArrayControl != null;
      if (data[1] !== '') {
        this.related = true;
        let match1;
        if (data[1].length !== 0) {
          switch (data[1][0].match) {
            case 'DISABLED':
              match1 = 'MATCH_DISABLED';
              break;
            case 'HIDDEN':
              match1 = 'MATCH_HIDDEN';
              break;
            case 'REQUIRED':
              match1 = 'MATCH_REQUIRED';
          }
          this.setOptions(match1, data[1][0].when[0].id, data[1][0].when[0].value);
        } else {
          this.related = false;
          this.setOptions('', '', '');
        }
      } else {
        this.related = false;
      }
    });
  }

  removeItem(context: DynamicFormArrayModel, index: number) {
    this.formService.removeFormArrayGroup(index, this.formArrayControl, context);
  }

  insertItem(context: DynamicFormArrayModel, index: number) {
    this.formService.insertFormArrayGroup(index, this.formArrayControl, context);
  }

  save(newModel) {
    let relats;
    if (this.related) {
      relats = {
        match: this.relations.getRawValue().relatedOption,
        relationId: this.relations.getRawValue().relatedId,
        relationValue: this.relations.getRawValue().relatedValue
      };
    } else {
      relats = '';
    }
    console.log(relats);
    if (this.formGroup.valid) {
      const event = {
        type: 'addProperties',
        payload: newModel,
        relations: relats
      };
      this.stateControlService.eventDispatcher.next(event);
      this.formModel = [];
      this.related = false;
      this.showForm = false;
      this.setOptions('', '', '');
    }
  }

  setOptions(match, id, value) {
    this.relations.setValue({
      relatedOption: match,
      relatedId: id,
      relatedValue: value
    });
  }
}
