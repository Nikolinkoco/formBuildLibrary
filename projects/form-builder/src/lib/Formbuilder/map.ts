import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ValuesMap {
  private _map = new Map();

  constructor() {
    this.setElements();
  }


  public getmap() {
    return this._map;
  }

  setElements() {
    this._map.set('INPUT', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      minLength: 'number',
      placeholder: 'text',
      mask: [],
      required: 'Boolean',
    });
    this._map.set('EMAIL', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      placeholder: 'text',
      mask: [],
      required: 'Boolean',

    });
    this._map.set('FILE', {
      id: 'text',
      label: 'text',
      required: 'Boolean',
    });
    this._map.set('PASSWORD', {
      id: 'text',
      label: 'text',
      maxLength: 'number',
      minLength: 'number',
      placeholder: 'text',
      mask: [],
      required: 'Boolean',

    });
    this._map.set('CHECKBOX', {
      id: 'text',
      label: 'text',
      required: 'Boolean'
    });
    this._map.set('RADIO_GROUP', {
      id: 'text',
      label: 'text',
      options:
        [{
          label: 'text',
          value: 'text'
        }],
      required: 'Boolean'
    });

    this._map.set('CHECKBOX_GROUP', {
      id: 'text',
      label: 'text',
      options:
        [{
          id: 'text',
          label: 'text'
        }],
      required: 'Boolean'
    });

    this._map.set('SLIDER', {
      id: 'text',
      min: 'number',
      max: 'number',
      vertical: 'Boolean',
      required: 'Boolean'
    });

    this._map.set('TEXTAREA', {
      id: 'text',
      label: 'text',
      minLength: 'number',
      required: 'Boolean'

    });

    this._map.set('SELECT', {
      id: 'text',
      label: 'text',
      options:
        [{
          label: 'text',
          value: 'text'
        }],
      required: 'Boolean'
    });
  }
}
