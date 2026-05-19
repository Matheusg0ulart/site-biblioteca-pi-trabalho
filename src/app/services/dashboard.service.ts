import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Autor } from '../models/autor';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private autoresApi = 'http://localhost:3000/autores';
  private livrosApi = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) { }

  carregarDados(): Observable<[Autor[], Livro[]]> {
    return forkJoin([
      this.http.get<Autor[]>(this.autoresApi),
      this.http.get<Livro[]>(this.livrosApi)
    ]);
  }
}