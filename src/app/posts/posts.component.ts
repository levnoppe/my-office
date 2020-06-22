import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Post} from './post.model';
import * as PostsActions from '../posts/store/posts.actions';
import {map} from 'rxjs/operators';
import {UtilService} from '../shared/util-service/util.service';

interface SortOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  error = new Subject<string>();
  private themeSub: Subscription;
  private postsSub: Subscription;
  appId = 'theme2';
  postsFeed: Post[] = [];
  unfilteredPostsFeed: Post[] = [];
  postsFilter: string;
  sortingParam: string;
  sortingDirection = false;

  sortOptions: SortOption[] = [
    {value: 'title', viewValue: 'Title'},
    {value: 'date', viewValue: 'Date'},
    {value: 'publicState', viewValue: 'Public'}
  ];

  constructor(private store: Store<fromApp.AppState>,
              private utilService: UtilService) {
  }

  onSelect(){
    // this.postsFeed = this.postsFeed.slice().sort(this.compare);
    this.postsFeed = this.utilService.sortingObjectsArray(
      this.postsFeed,
      this.sortingParam,
      this.sortingDirection
    );
  }

  onReverse(event: any){
    this.sortingDirection =  event.checked;
    // this.postsFeed = this.postsFeed.slice().sort(this.compare);
    this.postsFeed = this.utilService.sortingObjectsArray(
      this.postsFeed,
      this.sortingParam,
      this.sortingDirection
    );
  }
  // compare = ( a: Post, b: Post ) => {
  //   const param = this.sortingParam;
  //   if ( a[param] > b[param] ){
  //     return this.sortingDirection ? -1 : 1;
  //   }
  //   if ( a[param] < b[param] ){
  //     return this.sortingDirection ? 1 : -1;
  //   }
  //   return 0;
  // }


  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.store.dispatch(new PostsActions.FetchPosts());
    this.postsSub = this.store.select('posts')
      .pipe(map(postsState => postsState.posts))
      .subscribe(
        (posts: Post[]) => {
          this.unfilteredPostsFeed = posts;
          if (this.postsFilter) {
            posts = posts.filter((post) => {
              return (post.title.indexOf(this.postsFilter) !== -1
                || post.body.indexOf(this.postsFilter) !== -1);
            });
          }
          // this.postsFeed = posts.slice().sort(this.compare);
          this.postsFeed = this.utilService.sortingObjectsArray(
            posts,
            this.sortingParam,
            this.sortingDirection
          );
        }
      );
  }

  onKey(event: any) { // without type info
    this.postsFeed = this.unfilteredPostsFeed;
    this.postsFilter = event.target.value;
    this.postsFeed = this.postsFeed.filter((post) => {
      return (post.title.indexOf(this.postsFilter) !== -1
        || post.body.indexOf(this.postsFilter) !== -1);
    });
  }

  onClearPostsFilter(filterTextInput: HTMLInputElement){
    this.postsFilter = null;
    this.postsFeed = this.unfilteredPostsFeed;
    filterTextInput.value = null;
  }

  ngOnDestroy() {
    this.themeSub.unsubscribe();
    this.postsSub.unsubscribe();
  }
}
