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

  getGifs() {
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=12`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }

  searchForGifs(gifName: string) {
    return this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=${environment.giphyApiKey}&q=${gifName}&limit=12`)
    .subscribe((res: any) => {
      this.gifs.next(res.data);
    });
  }


  getGifsAsObservable() {
    return this.gifs.asObservable();
  }
}
