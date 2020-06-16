import { Component, OnInit } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {Article} from './bingNewsApi/bingNewsApi.model';
import {BingNewsApiService} from './bingNewsApi/bingNewsApi.service';




@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  error = new Subject<string>();
  private themeSub: Subscription;
  appId = 'theme2';
  articlesFeed: Article[] = [];




  constructor(private store: Store<fromApp.AppState>,
              // private newsApiService: NewsApiService,
              private bingNewsApiService: BingNewsApiService) {}

  ngOnInit(): void {
    this.themeSub = this.store.select('shared').subscribe(sharedState => {
      this.appId = sharedState.theme;
    });

    this.bingNewsApiService.fetchArticles().subscribe((articles) => {
     this.articlesFeed = articles;
    }, error => {
      this.error = error.message;
    });
  }


}
