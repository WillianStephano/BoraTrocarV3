import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CadastroAnunciosService } from '../../../services/anuncios-cadastro.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';

interface Condicao {
  value: string;
  valorVisualizado: string;
}

@Component({
  selector: 'app-anuncios-cadastro',
  templateUrl: './anuncios-cadastro.component.html',
  styleUrls: ['./anuncios-cadastro.component.scss'],
})
export class AnunciosCadastroComponent {
  cadastroAnunciosFormulario: FormGroup = new FormGroup({});
  valorSelecionado: string = '';
  imgSelecionado: File | undefined;
  imgConvertida: any;

  condicoes: Condicao[] = [
    { value: 'novo', valorVisualizado: 'Novo' },
    { value: 'usado', valorVisualizado: 'Usado' },
    { value: 'avariado', valorVisualizado: 'Avariado' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cadastroAnunciosService: CadastroAnunciosService,
    private router: Router,
    private meta: Meta
  ) {
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  ngOnInit(): void {
    this.cadastroAnunciosFormulario = this.formBuilder.group({
      img: [''],
      isbn: [[''], Validators.pattern(/^[0-9-]+$/)],
      nomeLivro: ['', [Validators.required]],
      autor: [''],
      condicao: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      descricao: [''],
    });
  }

  selecionarImagem(event: any) {
    const file = event.target.files[0] ?? undefined;

    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);

      this.imgConvertida = bytes;

      console.log('Array de bytes:', this.imgConvertida);
    };

    reader.readAsArrayBuffer(file);
  }

  cadastrarAnuncio() {
    const isbn = this.cadastroAnunciosFormulario.get('isbn')?.value;
    const nomeLivro = this.cadastroAnunciosFormulario.get('nomeLivro')?.value;
    const autor = this.cadastroAnunciosFormulario.get('autor')?.value;
    const condicao = this.cadastroAnunciosFormulario.get('condicao')?.value;
    const categoria = this.cadastroAnunciosFormulario.get('categoria')?.value;
    const descricao = this.cadastroAnunciosFormulario.get('descricao')?.value;

    this.cadastroAnunciosService
      .insere(
        this.imgConvertida,
        isbn,
        nomeLivro,
        autor,
        condicao,
        categoria,
        descricao
      )
      .subscribe(() => {
        alert('Livro cadastrado com sucesso');
        this.router.navigateByUrl('/anuncios');
      });

    console.log(this.imgConvertida);
  }
}
