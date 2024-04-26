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

    // Criar um objeto FormData
    const formData = new FormData();
    formData.append('isbn', isbn);
    formData.append('nomeLivro', nomeLivro);
    formData.append('autor', autor);
    formData.append('condicao', condicao);
    formData.append('categoria', categoria);
    formData.append('descricao', descricao);
    formData.append('imagem', imagem); // Adicionar o arquivo ao FormData

    // Enviar a requisição com FormData
    return this.http.post(
      this.API + `/livro/cadastrar`,
      formData,
      { headers }
    );
  }

}
