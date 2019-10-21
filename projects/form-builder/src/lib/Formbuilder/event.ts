export interface Event {
  type: string;
  payload?: any;
  relations?: any;
  listWithId?: any;
}

export interface NewForm {
  id: string;
  name: string;
  description: string;
}
