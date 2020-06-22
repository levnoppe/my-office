import {Component, Input, OnInit} from '@angular/core';
import {TaskCategory} from '../taskCategory.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TasksActions from '../store/tasks.actions';
import * as PostsActions from '../../posts/store/posts.actions';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() taskCategory: TaskCategory;
  @Input() index: number;
  @Input() editMode: string;
color;
  categoryForm: FormGroup;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    if (this.editMode === 'new') {
      this.taskCategory = new TaskCategory(null, '', '');
    }

    this.categoryForm = new FormGroup({
      categoryName: new FormControl(this.taskCategory.categoryName, [Validators.required]),
      color: new FormControl(this.taskCategory.color,[Validators.required]),
    });
    this.color = this.taskCategory.color;
  }

  onColorPicked(){
    this.categoryForm.patchValue({
      color: this.color
    });
  }
  onSubmit() {
    this.categoryForm.patchValue({
      color: this.color
    });
    if (this.editMode === 'edit') {
      this.store.dispatch(new TasksActions.UpdateCategory({
        index: this.taskCategory.id,
        newTaskCategory: this.categoryForm.value
      }));
    } else {
      this.store.dispatch(new TasksActions.AddCategory(this.categoryForm.value));
      this.initForm();
    }
  }

  onUpdateCategory(){
    this.categoryForm.patchValue({
      color: this.color
    });
    this.store.dispatch(new TasksActions.UpdateCategory(
      {
        index: this.taskCategory.id,
        newTaskCategory: this.categoryForm.value
      })
    );
  }

  onDeleteCategory() {
    this.store.dispatch(new TasksActions.DeleteCategory(this.taskCategory.id));
  }
}
