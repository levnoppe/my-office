import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from '../task.model';
import {TaskCategory} from '../taskCategory.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as TasksActions from '../store/tasks.actions';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {Subscription} from 'rxjs';

interface CategoryOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit{
  newTaskForm: FormGroup;
  task: Task = new Task(
    '',
    '',
    new TaskCategory('', '', ''),
    new Date(),
    false
  );
  taskCategoriesSub: Subscription;
  categoriesCollection: TaskCategory[] = [];
  // --------- date time picker params
  showSpinners = true;
  showSeconds = false;
  touchUi = true;
  hideTime = false;
  // ----------------------
  selectedCategory = new FormControl(this.categoriesCollection);

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<DialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.store.dispatch(new TasksActions.FetchCategories());
    this.taskCategoriesSub = this.store.select('taskCategories')
      .pipe(map(taskCategoriesState => taskCategoriesState.taskCategories))
      .subscribe(
        (taskCategories: TaskCategory[]) => {
          this.categoriesCollection = taskCategories;
        }
      );

    this.newTaskForm = new FormGroup({
      title: new FormControl(this.task.title, [Validators.required]),
      date: new FormControl(this.task.date, [Validators.required]),
      taskCategory: new FormControl(this.task.taskCategory, [Validators.required]),
      alert: new FormControl(this.task.alert),
    });
  }

  onSubmit(){
    if (!this.newTaskForm.value.alert){
      this.newTaskForm.value.alert = false;
    }
    this.store.dispatch(new TasksActions.AddTask(this.newTaskForm.value));
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelect() {
    // console.log(this.selectedCategory);
  }
}
