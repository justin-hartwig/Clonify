import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { firstValueFrom } from 'rxjs';
import SpotifyWebApi from 'spotify-web-api-js';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService extends Dexie {
  private spotifyApi: any;
  currentSongs!: Dexie.Table<Song, string>;

  constructor(private readonly http: HttpClient) {
    super('song-db');
    this.version(1).stores({
      currentSongs: 'id'
    })

    this.spotifyApi = new SpotifyWebApi();
  }

  async authenticate() {
    const clientId = 'ba92edbf586d47df81f69c0fe442ed01';
    const redirectUri = 'http://localhost:4200/auth';
    const scope = 'user-read-private user-read-email';
    const authEndpoint = 'https://accounts.spotify.com/authorize';

    const url = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = url;
  }

  async getTopSongs(){
    const response = await this.spotifyApi.searchTracks('top', {limit: 20});

    response.tracks.items.map((track: any) => (
      console.log(track)
    ));

    return response.tracks.items.map((track: any) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      duration: track.duration_ms,
      image_url: track.album.images[1].url,
      stream_url: '',
      download_url: ''
    }));
  }

  async getAll() {
    return await this.currentSongs.toArray();
  }
}