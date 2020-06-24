import {Post} from '../post.model';
import * as PostsActions from './posts.actions';

export interface State {
  posts: Post[];
  loading: boolean;
  postsError: string;
}

const initialState: State = {
  posts: [],
  loading: false,
  postsError: null
};

export function postsReducer(state = initialState, action: PostsActions.PostsActions) {
  let id;
  let addedPost;

  switch (action.type) {
    case PostsActions.LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payload],
        loading: false
      };
    case PostsActions.FETCH_POSTS:
      return {
        ...state,
        loading: true
      };
    case PostsActions.ADD_POST:
      id = 'newPost';
      addedPost = {...action.payload, id};
      return {
        ...state,
        posts: [...state.posts, addedPost]
      };
    case PostsActions.GET_KEY:
      const newIndex = state.posts.map(e => e.id).indexOf('newPost');
      id = action.payload;
      addedPost = {...state.posts[newIndex], id};
      const updPost = {
        ...state.posts[newIndex],
        ...addedPost
      };
      const updPosts = [...state.posts];
      updPosts[newIndex] = updPost;
      return {
        ...state,
        posts: updPosts
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
    case PostsActions.POSTS_ERROR:
      return {
        ...state,
        posts: null,
        postsError: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
