import {Action} from '@ngrx/store';
import {Post} from '../post.model';

export const ADD_POST = '[Contacts] Add Post';
export const LOAD_POSTS = '[Contacts] Load Posts';
export const FETCH_POSTS = '[Contacts] Fetch Posts';
export const UPDATE_POST = '[Contacts] Update Post';
export const DELETE_POST = '[Contacts] Delete Post';

export class AddPost implements Action{
  readonly type = ADD_POST;

  constructor(public payload: Post){}
}

export class LoadPosts implements Action{
  readonly type = LOAD_POSTS;

  constructor(public payload: Post[]){}
}

export class FetchPosts implements Action{
  readonly type = FETCH_POSTS;
}

export class UpdatePost implements Action{
  readonly type = UPDATE_POST;

  constructor(public payload: {index: string, newPost: Post}){}
}

export class DeletePost implements Action{
  readonly type = DELETE_POST;

  constructor(public payload: string){}
}

export type PostsActions =
  AddPost
  | LoadPosts
  | FetchPosts
  | UpdatePost
  | DeletePost;

