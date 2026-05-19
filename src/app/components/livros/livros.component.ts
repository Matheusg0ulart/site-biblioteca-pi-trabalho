import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Livro } from '../../models/livro';
import { Autor } from '../../models/autor';

import { LivroService } from '../../services/livro.service';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-livros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livros: Livro[] = [];

  livrosFiltrados: Livro[] = [];

pesquisa = '';

  autores: Autor[] = [];

  editando = false;

  livro: Livro = {
    id: 0,
    idAutor: 0,
    titulo: '',
    dataPublicacao: '',
    editora: '',
    genero: ''
  };

  constructor(
    private livroService: LivroService,
    private autorService: AutorService
  ) {}

  ngOnInit(): void {

    this.listarLivros();

    this.listarAutores();

  }

  listarLivros() {

    this.livroService.listar().subscribe((retorno: Livro[]) => {

      this.livros = retorno;
      this.livrosFiltrados = retorno;

    });

  }

  listarAutores() {

    this.autorService.listar().subscribe((retorno: Autor[]) => {

      this.autores = retorno;

    });

  }

  salvar() {

    this.livroService.criar(this.livro).subscribe(() => {

      this.livro = {
        id: 0,
        idAutor: 0,
        titulo: '',
        dataPublicacao: '',
        editora: '',
        genero: ''
      };

      this.listarLivros();

    });

  }

  excluir(id: number) {

    this.livroService.excluir(id).subscribe(() => {

      this.listarLivros();

    });

  }

  editar(livro: Livro) {

    this.livro = { ...livro };

    this.editando = true;

  }

  atualizar() {

    this.livroService.atualizar(this.livro.id, this.livro)
      .subscribe(() => {

        this.livro = {
          id: 0,
          idAutor: 0,
          titulo: '',
          dataPublicacao: '',
          editora: '',
          genero: ''
        };

        this.editando = false;

        this.listarLivros();

      });

  }

  buscarAutor(idAutor: number): string {

    const autor = this.autores.find(a => a.id == idAutor);

    return autor ? autor.nome : '';

  }

 consultar() {

  this.livrosFiltrados = this.livros.filter(l =>

    l.titulo.toLowerCase().includes(this.pesquisa.toLowerCase())

    ||

    l.id.toString().includes(this.pesquisa)

  );

}
}