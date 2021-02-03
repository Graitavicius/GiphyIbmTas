import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as data from './gifs/gifs.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  gifs = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  trendingPosition = 0;
  searchPosition = 0;

  getGifs() {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=12&offset=${this.trendingPosition}`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }

  searchForGifs(gifName: string) {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${gifName}&limit=12&offset=${this.searchPosition}`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }

  scrollTrendingPage() {
    this.trendingPosition = this.trendingPosition + 12;
  }

  scrollSearchPage() {
    this.searchPosition = this.searchPosition + 12;
  }


  getGifsAsObservable() {
    return this.gifs.asObservable();
  }
}
