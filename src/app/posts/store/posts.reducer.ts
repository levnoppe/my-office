import {Post} from '../post.model';
import * as PostsActions from './posts.actions';

export interface State {
  posts: Post[];
}

const initialState: State = {
  posts: []
};

export function postsReducer(state = initialState, action: PostsActions.PostsActions) {
  switch (action.type) {
    case PostsActions.LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload]
      };
    case PostsActions.FETCH_POSTS:
      return state;
    case PostsActions.ADD_POST:
      return {
        ... state,
        posts: [...state.posts, action.payload]
      };
    case PostsActions.UPDATE_POST:
      const updatedPost = {
        ...state.posts[action.payload.index],
        ...action.payload.newPost
      };
      const updatedPosts = [...state.posts];
      updatedPosts[action.payload.index] = updatedPost;
      return {
        ...state,
        posts: updatedPosts
      };
    case PostsActions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post.id !== action.payload;
        })
      };
    default:
      return state;
  }
}
