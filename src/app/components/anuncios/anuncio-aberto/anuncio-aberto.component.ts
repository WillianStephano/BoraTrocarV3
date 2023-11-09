import { ComentarioService } from './../../../services/comentario.service';
import { PerfilService } from './../../../services/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from '../../../services/anuncios.service';
import { Component, Input } from '@angular/core';
import { Anuncio } from '../../../models/Anuncio';
import { Observable } from 'rxjs/internal/Observable';
import { of, switchMap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Perfil } from 'src/app/models/Perfil';

export interface MeuObjeto {
  token: string;
}

@Component({
  selector: 'app-anuncio-aberto',
  templateUrl: './anuncio-aberto.component.html',
  styleUrls: ['./anuncio-aberto.component.scss'],
})
export class AnuncioAbertoComponent {
  anuncio$: Observable<Anuncio> | null;
  perfil$: Observable<Perfil>;
  comentarioFormulario: FormGroup = new FormGroup({});

  idN: number = 0;

  constructor(
    private anunciosService: AnunciosService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private comentarioService: ComentarioService
  ) {
    this.anuncio$ = null;
    this.perfil$ = perfilService.listaInfoPerfil();
  }

  abrirChat() {
    return this.router.navigate([`/chat`]);
  }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('idLivro');
    const idN = Number(id);

    this.anuncio$ = this.anunciosService.pegarAnuncio(idN);
    //this.anuncio$ = this.anunciosService.pegarAnuncio(1);

    this.comentarioFormulario = this.formBuilder.group({
      comentario: [[''], Validators.required],
    });

    var id = this.route.snapshot.paramMap.get('idLivro');
    this.idN = Number(id);
  }

  realizarComentario() {
    const comentario = this.comentarioFormulario.get('comentario')?.value;

    this.perfil$
      .pipe(
        switchMap((perfil) => {
          const autorComentario: string = perfil.nickname;
          return this.comentarioService.insere(
            comentario,
            autorComentario,
            this.idN
          );
        })
      )
      .subscribe((response) => {
        // lógica após inserir o comentário, se necessário
        console.log(response);
      });
  }
}
