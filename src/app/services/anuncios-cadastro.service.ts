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
    isbn: string,
    nomeLivro: string,
    autor: string,
    condicao: string,
    categoria: string,
    descricao: string,
    imagem: File
  ) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    // Criar um objeto FormData apenas para a imagem
    const formData = new FormData();
    formData.append('imagem', imagem);

    // Construir o corpo da requisição com os outros parâmetros
    const body = {
      isbn: isbn,
      nomeLivro: nomeLivro,
      autor: autor,
      condicao: condicao,
      categoria: categoria,
      descricao: descricao,
    };

    return this.http.post(this.API + '/livro/cadastrar', formData, {
      headers,
      params: body,
    });
  }
}
