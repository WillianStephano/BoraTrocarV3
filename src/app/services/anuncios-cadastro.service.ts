import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CadastroAnunciosService {
  private readonly API = `http://localhost:8090`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insere(
    img: Uint8Array,
    isbn: string,
    nomeLivro: string,
    autor: string,
    condicao: string,
    categoria: string,
    descricao: string
  ) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    console.log(img);
    console.log(typeof(img));
    return this.http.post(
      this.API + `/livro/cadastrar`,
      {
        img,
        isbn,
        nomeLivro,
        autor,
        condicao,
        categoria,
        descricao,
      },
      { headers }
    );

  }
}
