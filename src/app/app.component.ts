import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clonify-app';
  constructor(private songService: SongService){
    
  }

  ngOnInit() {
    console.log(this.songService.getTopSongs());
  }
}
