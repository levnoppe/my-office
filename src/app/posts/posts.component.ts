import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Post} from './post.model';
import * as PostsActions from '../posts/store/posts.actions';
import {map} from 'rxjs/operators';
import {UtilService} from '../shared/util-service/util.service';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {State} from './store/posts.reducer';
import {AlertComponent} from '../shared/alert/alert.component';

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
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

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
              private utilService: UtilService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  onSelect(){
    this.postsFeed = this.utilService.sortingObjectsArray(
      this.postsFeed,
      this.sortingParam,
      this.sortingDirection
    );
  }

  onReverse(event: any){
    this.sortingDirection =  event.checked;
    this.postsFeed = this.utilService.sortingObjectsArray(
      this.postsFeed,
      this.sortingParam,
      this.sortingDirection
    );
  }
  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.store.dispatch(new PostsActions.FetchPosts());
    this.postsSub = this.store.select('posts')
      // .pipe(map(postsState => postsState.posts))
      .subscribe(
        (postsState: State) => {
          this.isLoading = postsState.loading;
          this.error = postsState.postsError;
          if (this.error){
            this.showErrorAlert(this.error);
          }
          if (postsState.posts){
            this.unfilteredPostsFeed = postsState.posts;
            if (this.postsFilter) {
              postsState.posts = postsState.posts.filter((post) => {
                return (post.title.indexOf(this.postsFilter) !== -1
                  || post.body.indexOf(this.postsFilter) !== -1);
              });
            }
            this.postsFeed = this.utilService.sortingObjectsArray(
              postsState.posts,
              this.sortingParam,
              this.sortingDirection
            );
          }
        }
      );
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
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
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }

    this.themeSub.unsubscribe();
    this.postsSub.unsubscribe();
  }
}
