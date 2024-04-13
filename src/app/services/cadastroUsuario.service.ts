import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CadastroUsuarioService {
  private readonly API = `http://localhost:8090`;

  constructor(private http: HttpClient) {}

  insereNoBanco(
    nomeUsuario: string,
    email: string,
    nickname: string,
    senha: string,
    dataNascimento: string,
    accessToken: string
  ) {
    // Prepare user data to send to backend
    const userData = {
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      accessToken, // Include access token for backend verification
    };

    // Make a POST request to the backend endpoint for user registration
    return this.http.post(this.API + `/usuario/cadastrar`, userData);
  }
}
