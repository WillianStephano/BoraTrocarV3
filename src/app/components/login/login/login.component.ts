import { LoginService } from '../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;

  loginFormulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private LoginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormulario = this.formBuilder.group({
      //aqui eu controlo o form de login, o primeiro parametro do array é o valor padrao do form.
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  login() {
    const email = this.loginFormulario.get('email')?.value;
    const senha = this.loginFormulario.get('senha')?.value;

    console.log(email, senha);

    this.LoginService.autentica(email, senha).subscribe(
      () => this.router.navigateByUrl('/anuncios'),
      (err) => {
        console.log(err);
        this.loginFormulario.reset();
        alert('Email ou senha invalidos.');
      }
    );
  }

  oauthSignIn(): Observable<void> {
    const oauth2Endpoint: string =
      'https://accounts.google.com/o/oauth2/v2/auth';

    const params: Record<string, string> = {
      client_id:
        '1080745343050-m9srtidj9941rm09ler1jh2sp48n2idn.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:4200',
      response_type: 'token',
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
      include_granted_scopes: 'true',
      state: 'pass-through value',
    };

    const urlParams: URLSearchParams = new URLSearchParams(params);
    const authUrl: string = `${oauth2Endpoint}?${urlParams}`;

    window.location.href = authUrl;

    return new Observable<void>((observer) => {
      window.addEventListener('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('access_token');
        const expiresIn = urlParams.get('expires_in');

        console.log('Access Token:', accessToken);
        console.log('Expires In:', expiresIn);

        observer.next();
        observer.complete();
      });
    }).pipe(
      tap(() => {
        console.log('Token captured and logged');
      })
    );
  }
}
