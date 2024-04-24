export interface Anuncio {
  idLivro: number;
  isbn: string;
  nomeLivro: string;
  img: Uint8Array;
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
