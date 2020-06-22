import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TasksActions from '../store/tasks.actions';
import {map} from 'rxjs/operators';
import {TaskCategory} from '../taskCategory.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;
  taskForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.taskForm = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      date: new FormControl(this.task.date, [Validators.required]),
      taskCategory: new FormControl(this.task.taskCategory, [Validators.required]),
      alert: new FormControl(this.task.alert),
    });
  }

  onUpdateTask(){
    this.store.dispatch(new TasksActions.UpdateTask(
      {
        index: this.task.id,
        newTask: this.taskForm.value
      })
    );
  }
  onDeleteTask(){
    this.store.dispatch(new TasksActions.DeleteTask(this.task.id));
  }
}
