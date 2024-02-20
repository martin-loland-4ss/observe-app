import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer  } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  public posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAtInterval(5*1000);
  }

  private loadAtInterval(interval: number): void {
    timer(0, interval) // Emit value immediately, then every <interval> milliseconds
      .pipe(
        switchMap(() => this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts')),
        tap(posts => {
          console.log("updating posts"); 
          const nPosts = posts.length;
          const start = Math.floor(Math.random() * (nPosts - 5));
          const selection = posts.slice(start, start+5);         
          this.postsSubject.next(selection);
        })
      )
      .subscribe();
  }
}
