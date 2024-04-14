import { Anuncio } from '../../../models/Anuncio';
import { AnunciosService } from '../../../services/anuncios.service';
import { Component, HostListener, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss'],
})
export class AnunciosComponent {
  anuncios$: Observable<Anuncio[]>;

  constructor(
    private anunciosService: AnunciosService,
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {
    this.anuncios$ = this.anunciosService.listaTudo();
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  criaUmAnuncio() {
    this.router.navigate(['novo'], { relativeTo: this.route });
  }

  abrirAnuncio(id: number) {
    return this.router.navigate([`livro/${id}`]);
  }

  //Gambiarra tosca para forçar reload ao usuario logar, contudo toda hora que vai para a rota /anuncios ele ta dando reload CORRIGIR;
  ngOnInit() {
    const paginaRecarregada = localStorage.getItem('paginaRecarregada');
    if (!paginaRecarregada) {
      localStorage.setItem('paginaRecarregada', 'true');
      console.log('Página recarregada');
      window.location.reload();
    } else {
      localStorage.removeItem('paginaRecarregada');
    }
  }
}
