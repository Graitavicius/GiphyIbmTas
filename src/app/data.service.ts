import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  gifs = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) { }
  trendingPosition = 0;
  gifName = '';
  position = 0;

  getGifs() {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=12&offset=${this.trendingPosition}`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }

  searchForGifs(gifName: string, searchPosition: number) {
    this.gifName = gifName;
    this.position = searchPosition;
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${gifName}&limit=12&offset=${searchPosition}`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }

  scrollSearch() {
    if (this.gifName !== '') {
      this.position += 12;
      this.searchForGifs(this.gifName, this.position);
    }
  }

  scrollTrendingPage() {
    this.trendingPosition = this.trendingPosition + 12;
  }

  getGifsAsObservable() {
    return this.gifs.asObservable();
  }
}
