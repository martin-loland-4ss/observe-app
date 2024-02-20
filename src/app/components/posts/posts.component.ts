import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlaceholderService } from '../../services/placeholder.service'; // Adjust the path as per your project structure
import type { IPost } from '../../services/placeholder.service'; // Adjust the path as per your project structure
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: IPost[] = [];
  postsSubscription!: Subscription;

  constructor(private placeholderService: PlaceholderService) { }

  ngOnInit(): void {
    this.postsSubscription = this.placeholderService.posts$.subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }
}