import { PerfilService } from './perfil.service';
import { TokenService } from './../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly API = `http://localhost:8080`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insere(comentario: string, idUsuario: string, idPublicacao: number) {
    return this.http.post(this.API + `/cadastrar`, {
      idUsuario,
      idPublicacao,
      comentario,
    });
  }
}
