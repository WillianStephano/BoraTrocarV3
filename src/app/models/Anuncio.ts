export interface Anuncio {
  idLivro: number;
  isbn: string;
  nomeLivro: string;
  img: File;
  autor: {
    nomeAutor: string;
  };
  categoria: {
    nomeCategoria: string;
  };
  condicao: {
    nomeCondicao: string;
  };
  descricao: string;
  usuario: {
    nomeUsuario: string;
  };
}
