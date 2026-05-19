import { Component, OnInit, Input } from '@angular/core';
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

  @Input() modo = 'cadastrar';

  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  autores: Autor[] = [];

  pesquisa = '';
  editando = false;

  livro: Livro = {
    id: '',
    codigo: 0,
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
    const maiorCodigo = this.livros.length > 0
      ? Math.max(...this.livros.map(l => l.codigo || 0))
      : 0;

    const novoLivro: Livro = {
      ...this.livro,
      codigo: maiorCodigo + 1
    };

    this.livroService.criar(novoLivro).subscribe(() => {
      this.limparFormulario();
      this.listarLivros();
    });
  }

  excluir(id: any) {
    this.livroService.excluir(id).subscribe(() => {
      this.listarLivros();
    });
  }

  editar(livro: Livro) {
    this.livro = { ...livro };
    this.editando = true;
  }

  atualizar() {
    this.livroService.atualizar(this.livro.id, this.livro).subscribe(() => {
      this.limparFormulario();
      this.editando = false;
      this.listarLivros();
    });
  }

  consultar() {
    this.livrosFiltrados = this.livros.filter(l =>
      l.titulo.toLowerCase().includes(this.pesquisa.toLowerCase()) ||
      l.codigo.toString().includes(this.pesquisa)
    );
  }

  buscarAutor(idAutor: number): string {
    const autor = this.autores.find(a => a.id == idAutor);
    return autor ? autor.nome : '';
  }

  limparFormulario() {
    this.livro = {
      id: '',
      codigo: 0,
      idAutor: 0,
      titulo: '',
      dataPublicacao: '',
      editora: '',
      genero: ''
    };
  }

}