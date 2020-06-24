import {Action} from '@ngrx/store';
import {Post} from '../post.model';

export const ADD_POST = '[Posts] Add Post';
export const GET_KEY = '[Posts] Get Key';
export const LOAD_POSTS = '[Posts] Load Posts';
export const FETCH_POSTS = '[Posts] Fetch Posts';
export const UPDATE_POST = '[Posts] Update Post';
export const DELETE_POST = '[Posts] Delete Post';
export const POSTS_ERROR = '[Posts] Posts Error';

export class AddPost implements Action{
  readonly type = ADD_POST;

  constructor(public payload: Post){}
}

export class GetKey implements Action{
  readonly type = GET_KEY;

  constructor(public payload: string){}
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

export class PostsError implements Action {
  readonly type = POSTS_ERROR;

  constructor(public payload: string ) {
  }
}

export type PostsActions =
  AddPost
  | GetKey
  | LoadPosts
  | FetchPosts
  | UpdatePost
  | DeletePost
  | PostsError;

