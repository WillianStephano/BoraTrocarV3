import { PerfilService } from './perfil.service';
import { TokenService } from './../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly API = `http://localhost:8090`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insere(comentario: string, autor: string, idLivro: number) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http.post(
      this.API + `/livro/comentar`,
      {
        comentario,
        autor,
        idLivro
      },
      { headers }
    );
  }
}
