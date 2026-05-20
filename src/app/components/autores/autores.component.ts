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
  autorParaExcluir: Autor | null = null;

  autor: Autor = {
    id: 0,
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

    const maiorId = this.maiorIdNumerico();

    const novoAutor: Autor = {
      ...this.autor,
      id: maiorId + 1,
      codigo: maiorCodigo + 1
    };

    this.autorService.criar(novoAutor).subscribe(() => {
      this.limparFormulario();
      this.listarAutores();
    });
  }

  abrirConfirmacaoExclusao(autor: Autor) {
    this.autorParaExcluir = autor;
  }

  cancelarExclusao() {
    this.autorParaExcluir = null;
  }

  confirmarExclusao() {
    if (!this.autorParaExcluir) {
      return;
    }

    this.autorService.excluir(this.autorParaExcluir.id).subscribe(() => {
      this.autorParaExcluir = null;
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
      id: 0,
      codigo: 0,
      nome: '',
      dataNascimento: '',
      nacionalidade: ''
    };
  }

  maiorIdNumerico(): number {
    const idsNumericos = this.autores
      .map(a => Number(a.id))
      .filter(id => Number.isInteger(id) && id > 0);

    const codigos = this.autores
      .map(a => a.codigo || 0)
      .filter(codigo => codigo > 0);

    return Math.max(0, ...idsNumericos, ...codigos);
  }

}
