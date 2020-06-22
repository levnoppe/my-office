import {Time} from '@angular/common';
import {TaskCategory} from './taskCategory.model';

export class Task {

  constructor(public id: string,
              public title: string,
              public taskCategory: TaskCategory,
              public date: Date,
              public alert: boolean) {
  }

}
