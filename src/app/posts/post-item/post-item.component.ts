import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as PostsActions from '../store/posts.actions';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() index: number;
  @Input() editMode: string;
  title: string;
  body: string;
  date: Date;
  publicState: boolean;
  postForm: FormGroup;
  private storeSub: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.initForm();

  }

  private initForm() {
    if (this.editMode === 'new') {
      this.post = new Post(new Date(), '', '', true);
    }

    this.postForm = new FormGroup({
      title: new FormControl(this.post.title),
      date: new FormControl(this.post.date),
      body: new FormControl(this.post.body),
      publicState: new FormControl({value: this.post.publicState, disabled: false})
    });

    if (this.editMode === 'readonly') {
      this.postForm.controls.publicState.disable();
    }
  }

  onSubmit() {

    if (this.editMode === 'edit') {
      this.store.dispatch(new PostsActions.UpdatePost({
        index: this.post.id,
        newPost: this.postForm.value
      }));
      this.editMode = 'readonly';
    } else {
      this.store.dispatch(new PostsActions.AddPost(this.postForm.value));
      this.initForm();
    }
  }

  onStartEdit(){
    this.editMode = 'edit';
    this.postForm.controls.publicState.enable();
  }

  onSavePost(){
    this.store.dispatch(new PostsActions.UpdatePost(
      {
        index: this.post.id,
        newPost: this.postForm.value
      })
    );
  }

  onCancelEdit(){
    this.editMode = 'readonly';
    this.initForm();
  }

  onDeletePost() {
    this.store.dispatch(new PostsActions.DeletePost(this.post.id));
  }

}
