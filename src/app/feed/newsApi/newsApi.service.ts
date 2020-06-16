import { Injectable, Inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Article} from './newsApi.model';


@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

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
    const endpoint = 'https://newsapi.org/v2/top-headlines';
    const params = {country: 'us'};
    const url = this.createUrlFromEndpointAndOptions(endpoint, params);

    return this.http.get<{ [key: string]: Article }>(
      url,
      {
        headers: new HttpHeaders({'X-Api-Key': '9595a82887484dd4b6793c98580b448b'}
        ),
        responseType: 'json'
      }
    ).pipe(
      map(responseData => {
        const articles = responseData.articles;
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
