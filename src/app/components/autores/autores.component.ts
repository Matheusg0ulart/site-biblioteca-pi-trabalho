import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Autor } from '../../models/autor';
import { AutorService } from '../../services/autor.service';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  @Input() modo = 'cadastrar';

  autores: Autor[] = [];
  autoresFiltrados: Autor[] = [];

  editando = false;
  pesquisa = '';

  autor: Autor = {
    id: '',
    codigo: 0,
    nome: '',
    dataNascimento: '',
    nacionalidade: ''
  };

  constructor(private autorService: AutorService) {}

  ngOnInit(): void {
    this.listarAutores();
  }

  listarAutores() {
    this.autorService.listar().subscribe((retorno: Autor[]) => {
      this.autores = retorno;
      this.autoresFiltrados = retorno;
    });
  }

  salvar() {
    const maiorCodigo = this.autores.length > 0
      ? Math.max(...this.autores.map(a => a.codigo || 0))
      : 0;

    const novoAutor: Autor = {
      ...this.autor,
      codigo: maiorCodigo + 1
    };

    this.autorService.criar(novoAutor).subscribe(() => {
      this.limparFormulario();
      this.listarAutores();
    });
  }

  excluir(id: any) {
    this.autorService.excluir(id).subscribe(() => {
      this.listarAutores();
    });
  }

  editar(autor: Autor) {
    this.autor = { ...autor };
    this.editando = true;
  }

  atualizar() {
    this.autorService.atualizar(this.autor.id, this.autor).subscribe(() => {
      this.limparFormulario();
      this.editando = false;
      this.listarAutores();
    });
  }

  consultar() {
    this.autoresFiltrados = this.autores.filter(a =>
      a.nome.toLowerCase().includes(this.pesquisa.toLowerCase()) ||
      a.codigo.toString().includes(this.pesquisa)
    );
  }

  limparFormulario() {
    this.autor = {
      id: '',
      codigo: 0,
      nome: '',
      dataNascimento: '',
      nacionalidade: ''
    };
  }

}