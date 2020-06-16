import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Contact} from './randomUserApi.model';



@Injectable({
  providedIn: 'root'
})
export class RandomUserApiService {

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
    const query =  this.serialize(params) + '&noinfo';
    return query ? endpoint.concat('?').concat(query) : endpoint;
  }
  fetchContacts() {
    const endpoint = 'https://randomuser.me/api/';
    const params = {results: 30};
    const url = this.createUrlFromEndpointAndOptions(endpoint, params);

    return this.http.get<{ [key: string]: Contact }>(
      url,
      {
        responseType: 'json'
      }
    ).pipe(
      map(responseData => {
        const contacts = responseData.results;
        const postArray: Contact[] = [];
        for (const key in contacts) {
          if (contacts.hasOwnProperty(key)) {
            postArray.push({...contacts[key], id: key});
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
