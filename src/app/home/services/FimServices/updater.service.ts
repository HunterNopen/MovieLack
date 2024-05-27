import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '../../types/films.updater';


@Injectable()
export class UpdaterService {

    constructor(private client: HttpClient) { }

    myFilms: Film[] = [];

    private apiUrl = 'https://api.themoviedb.org/3/movie/';
    private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjdmMmM3YzVjZGFkYjAxYzI0OWMxMzAwNTdlZTk1MiIsInN1YiI6IjY1NzYwNjYyYTg0YTQ3MmRlM2Y0NDdiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zr-t82oL35Gga6LEKiTS5gMQsF8kj4Mq4-PTfb-MNU8'; // Replace with your TMDb API key

    update() {

        const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.apiKey}` });

        for (let i = 0; i < 20; i++) {
            const rand = Math.floor(Math.random() * (4000 - 1000) + 1000);

                this.client.get<Film>('https://api.themoviedb.org/3/movie/' + rand, { headers }).subscribe(
                    (response) => {
                        this.myFilms.push(this.mapToFilm(response));
                    }
                );
        }
        
    }

    mapToFilm(response: any): Film {
        return {
            id: response.id,
            title: response.title,
            tagline: response.tagline,
            vote_average: response.vote_average - 3,
            genres: response.genres.map((genre: any) => genre.name),
            poster_path: response.poster_path,
        };
    }
}
