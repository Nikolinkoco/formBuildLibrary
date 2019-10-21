import {Injectable} from '@angular/core';
import {of, Subject} from 'rxjs';
import {
  DynamicCheckboxGroupModel,
  DynamicCheckboxModel,
  DynamicFormArrayModel,
  DynamicFormControlModel,
  DynamicFormModel,
  DynamicInputModel,
  DynamicRadioGroupModel,
  DynamicSelectModel,
  DynamicSliderModel,
  DynamicTextAreaModel,
  MATCH_DISABLED,
  MATCH_HIDDEN,
  MATCH_REQUIRED
} from '@ng-dynamic-forms/core';
import {Event} from '../event';
import {ValuesMap} from '../map';

@Injectable({
  providedIn: 'root'
})
export class StateControlService {
  object: any;
  control: string;
  eventDispatcher = new Subject<Event>();
  dataModel = new Subject<[DynamicFormModel, any]>();
  formModel = new Subject<DynamicFormControlModel>();
  edit = new Subject<DynamicFormControlModel>();
  formControl: DynamicFormModel;
  toBeEdit = false;
  updateContent = new Subject<boolean>();
  map = new Map();
  idList = new Subject<any[]>();

  constructor(private mapStandart: ValuesMap) {
    this.eventDispatcher.subscribe((data: Event) => this.createProperties(data));

  }

  createProperties(data: Event) {
    switch (data.type) {
      case 'addFormControl':
        this.onAddFormControl(data);
        break;
      case 'addProperties':
        this.onAddProperties(data);
        break;
    }
  }

  onAddFormControl(data: Event) {
    this.map = this.mapStandart.getmap();
    this.formControl = [];
    let pair;
    let relations = '';
    if (data.payload.type) {
      this.toBeEdit = true;
      pair = this.map.get(data.payload.type);
      relations = data.payload.relations;
      this.control = data.payload.type;
    } else {
      this.toBeEdit = false;
      pair = this.map.get(data.payload);
      this.control = data.payload;
    }
    let valueOfControl;
    let req;
    for (const controlValues in pair) {
      if (pair.hasOwnProperty(controlValues)) {
        controlValues === 'id' ? req = true : req = null;
        valueOfControl = data.payload[controlValues];
        if (pair[controlValues] === 'number' || pair[controlValues] === 'text') {
          this.createInputWithDifferentTypes(pair[controlValues], controlValues, req, valueOfControl);
        } else {
          if (pair[controlValues] === 'Boolean') {
            this.createCheckbox(controlValues, valueOfControl);
          }
        }
        if (controlValues === 'options') {
          if (data.payload._options || data.payload.group) {
            this.createOptionsFull(data, controlValues);
          } else {
            this.createOptionsEmpty(controlValues);
          }
        } else {
          if (controlValues === 'mask') {
            this.createInputWithDifferentTypes('text', controlValues, req, valueOfControl);
          }
        }
      }
    }
    this.dataModel.next([this.formControl, relations]);
  }

  onAddProperties(data) {
    console.log(data.relations);
    let attr = '';
    this.object = {id: ''};
    if (this.control === 'SELECT') {
      attr = 'options';
      this.object[attr] = of([]);
    }
    this.setRelations(data);
    data.payload.forEach(element => {

      if (element.type === 'ARRAY') {
        if (element.id === 'options') {
          attr = 'options';
          this.object[attr] = [];
          attr = 'group';
          this.object[attr] = [];
          element.groups.forEach(arrayElement => {
            const val = arrayElement.group[0]._value + '';
            const optObject = {
              id: val,
              label: val
            };
            if (this.control === 'CHECKBOX_GROUP') {
              this.object[attr].push(new DynamicCheckboxModel(
                optObject
              ));
            } else {
              attr = 'options';
              this.object[attr].push(optObject);
            }
          });
        }
      } else {
        if (element.id === 'mask') {
          if (element._value) {
            this.object[element.id] = [];
            let val = element._value + '';
            if (val.charAt(0) === '/' && val.charAt(val.length - 1) === '/') {
              val = val.substring(1, val.length - 1);
            }
            this.object[element.id].push(new RegExp(val));
          }
        } else {
          this.object[element.id] = element._value;
        }
      }
    });
    const form = this.createFormControlDynamiclly();
    console.log(this.idList, 'listaMeId');
    if (this.toBeEdit) {
      this.edit.next(form);
    } else {
      this.formModel.next(form);
    }

  }

  createOptionsFull(data: Event, controlValues) {
    let attr = '';
    if (data.payload.type === 'CHECKBOX_GROUP') {
      attr = 'group';
    } else {
      attr = '_options';
    }
    length = data.payload[attr].length;
    let i = -1;
    this.formControl.push(new DynamicFormArrayModel({
      id: controlValues,
      initialCount: length,
      groupFactory: () => {
        return [
          new DynamicInputModel({
            id: 'myInput',
            label: (i < length && i >= 0) ? data.payload[attr][i].label : '',
            value: (i < length && i >= 0) ? data.payload[attr][i++].label + '' : i++
          })];
      }
    }));
  }

  createOptionsEmpty(controlValues) {
    this.formControl.push(new DynamicFormArrayModel({
      id: controlValues,
      initialCount: 3,
      groupFactory: () => {
        return [
          new DynamicInputModel({
            id: 'myInput',
            label: 'Item'
          })];
      }
    }));
  }

  createCheckbox(controlValues, value) {
    this.formControl.push(new DynamicCheckboxModel({
      id: controlValues,
      label: controlValues,
      value
    }));
  }

  createInputWithDifferentTypes(type, controlValues, req, value) {
    this.formControl.push(new DynamicInputModel({
      id: controlValues,
      label: controlValues,
      inputType: type,
      value,
      required: req,
    }));
  }

  createFormControlDynamiclly() {
    let form;
    let attr;
    attr = 'inputType';
    switch (this.control) {
      case 'INPUT':
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'EMAIL':
        this.object[attr] = 'email';
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'FILE':
        this.object[attr] = 'file';
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'SELECT':
        form = new DynamicSelectModel<string>(
          this.object
        );
        return form;
      case 'PASSWORD':
        this.object[attr] = 'password';
        form = new DynamicInputModel(
          this.object
        );
        return form;
      case 'CHECKBOX':
        form = new DynamicCheckboxModel(
          this.object);
        return form;
      case 'RADIO_GROUP':
        form = new DynamicRadioGroupModel<string>(
          this.object
        );
        return form;
      case 'CHECKBOX_GROUP':
        form = new DynamicCheckboxGroupModel(
          this.object
        );
        return form;
      case 'SLIDER':
        form = new DynamicSliderModel(
          this.object
        );
        return form;
      case 'TEXTAREA':
        form = new DynamicTextAreaModel(this.object);
        return form;
    }
  }

  setRelations(data) {
    if (data.relations !== '') {
      const attr = 'relations';
      this.object[attr] = [];
      switch (data.relations.match) {
        case 'MATCH_DISABLED':
          this.object[attr].push({
            match: MATCH_DISABLED,
            when: [{id: data.relations.relationId, value: data.relations.relationValue}]
          });
          break;
        case 'MATCH_HIDDEN':
          this.object[attr].push({
            match: MATCH_HIDDEN,
            when: [{id: data.relations.relationId, value: data.relations.relationValue}]
          });
          break;
        case 'MATCH_REQUIRED':
          this.object[attr].push({
            match: MATCH_REQUIRED,
            when: [{id: data.relations.relationId, value: data.relations.relationValue}]
          });
      }
    }
  }
}
