import { CadastroUsuarioService } from '../../../services/cadastroUsuario.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastroUsuario.component.html',
  styleUrls: ['./cadastroUsuario.component.scss'],
})
export class CadastroUsuarioComponent {
  cadastroUsuarioFormulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private CadastroUsuarioService: CadastroUsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cadastroUsuarioFormulario = this.formBuilder.group({
      //aqui eu controlo o form de cadastro, o primeiro parametro do array é o valor padrao do form.
      nomeUsuario: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z\s]*$/),
        ],
      ],

      email: ['', [Validators.required, Validators.email]],

      nickname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],

      dataNascimento: [
        '',
        [Validators.required /* this.validaDataNascimento() */],
      ],
    });
  }

  cadastrarUsuario() {
    const nomeUsuario =
      this.cadastroUsuarioFormulario.get('nomeUsuario')?.value;
    const email = this.cadastroUsuarioFormulario.get('email')?.value;

    const nickname = this.cadastroUsuarioFormulario.get('nickname')?.value;
    const senha = this.cadastroUsuarioFormulario.get('senha')?.value;
    const dataNascimento =
      this.cadastroUsuarioFormulario.get('dataNascimento')?.value;
    const accessToken = '';
    this.CadastroUsuarioService.insereNoBanco(
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      accessToken
    ).subscribe(() => {
      alert('Cadastro efetuado com sucesso');
      this.router.navigateByUrl('/login');
    });
  }

  limpar() {
    this.cadastroUsuarioFormulario.reset();
  }

  oauthSignIn(): void {
    // Google's OAuth 2.0 endpoint for requesting an access token
    const oauth2Endpoint: string =
      'https://accounts.google.com/o/oauth2/v2/auth';

    // Parameters to pass to OAuth 2.0 endpoint.
    const params: Record<string, string> = {
      client_id:
        '1080745343050-m9srtidj9941rm09ler1jh2sp48n2idn.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:4200',
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      include_granted_scopes: 'true',
      state: 'pass-through value',
    };

    // Construct the URL by appending the parameters
    const urlParams: URLSearchParams = new URLSearchParams(params);
    const authUrl: string = `${oauth2Endpoint}?${urlParams}`;

    // Redirect the user to the OAuth 2.0 endpoint
    window.location.href = authUrl;

    // Attach an event listener to handle the authentication response
    window.addEventListener('load', () => {
      // Extract parameters from the URL after redirection
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = urlParams.get('access_token');
      const expiresIn = urlParams.get('expires_in');

      // Log the access token and expiration information
      console.log('Access Token:', accessToken);
      console.log('Expires In:', expiresIn);

      // Use the access token to send user data to the backend
      this.sendUserDataToBackend(accessToken);
    });
  }

  sendUserDataToBackend(accessToken: string | null): void {
    // Make a request to the backend to send user data
    if (accessToken) {
      // Get user data from the form or any other source
      const nomeUsuario = 'John Doe';
      const email = 'john@example.com';
      const nickname = 'johndoe';
      const senha = 'password';
      const dataNascimento = '1990-01-01';

      // Call the service to insert user data into the database
      this.CadastroUsuarioService.insereNoBanco(
        nomeUsuario,
        email,
        nickname,
        senha,
        dataNascimento,
        accessToken
      ).subscribe(
        (response) => {
          console.log('User data sent to backend:', response);
          // Handle the response from the backend, if needed
        },
        (error) => {
          console.error('Error sending user data to backend:', error);
          // Handle errors, if any
        }
      );
    } else {
      console.error('Access token is null');
    }
  }

  /* validaDataNascimento(): Validators {
    return (cadastroUsuarioFormulario: FormGroup) => {
      const dataAtual = new Date();
      const anoAtual = dataAtual.getFullYear();
      console.log(anoAtual);

      const dataDoForm = cadastroUsuarioFormulario.get('dataNascimento')?.value;
      console.log(dataDoForm);

      if (dataDoForm >= anoAtual) {
        return { dataMaxima: true };
      }

      return null;
    };
  } */
}
