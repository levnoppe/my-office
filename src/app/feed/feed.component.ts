import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Article} from './bingNewsApi/bingNewsApi.model';
import {BingNewsApiService} from './bingNewsApi/bingNewsApi.service';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {AlertComponent} from '../shared/alert/alert.component';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy {
  private themeSub: Subscription;
  private closeSub: Subscription;
  appId = 'theme2';
  articlesFeed: Article[] = [];
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  isLoading = true;
  error: string = null;

  constructor(private store: Store<fromApp.AppState>,
              // private newsApiService: NewsApiService,
              private bingNewsApiService: BingNewsApiService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.bingNewsApiService.fetchArticles().subscribe((articles) => {
      this.isLoading = false;
      this.articlesFeed = articles;
    }, error => {
      this.isLoading = false;
      this.error = error.message;
      this.showErrorAlert(error.message);
    });
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

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }

    this.themeSub.unsubscribe();
  }
}
