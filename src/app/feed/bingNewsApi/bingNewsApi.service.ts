import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Article} from './bingNewsApi.model';


@Injectable({
  providedIn: 'root'
})
export class BingNewsApiService {

  constructor(private http: HttpClient){}

  serialize(obj) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }

  createUrlFromEndpointAndOptions(endpoint, params) {
    const query = this.serialize(params);
    return query ? endpoint.concat('?').concat(query) : endpoint;
  }
  fetchArticles() {
    const endpoint = 'https://news-search-domain.cognitiveservices.azure.com/bing/v7.0/news';
    const params = {};
    const url = this.createUrlFromEndpointAndOptions(endpoint, params);

    return this.http.get<{ [key: string]: Article }>(
      url,
      {
        headers: new HttpHeaders({'Ocp-Apim-Subscription-Key': '0f78528e9a2b4bd2af46929953cde46d'}
        ),
        responseType: 'json'
      }
    ).pipe(
      map(responseData => {
        const articles = responseData.value;
        const postArray: Article[] = [];
        for (const key in articles) {
          if (articles.hasOwnProperty(key)) {
            postArray.push({...articles[key], id: key});
          }
        }
        return postArray;
      }),
      catchError(errorRes => {
        // ...
        return throwError(errorRes);
      })
    );
  }
}
