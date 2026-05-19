import { Component, OnInit } from '@angular/core';
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

  autores: Autor[] = [];
  editando = false;

  autoresFiltrados: Autor[] = [];

pesquisa = '';

  autor: Autor = {
    id: 0,
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
    this.autorService.criar(this.autor).subscribe(() => {

      this.autor = {
        id: 0,
        nome: '',
        dataNascimento: '',
        nacionalidade: ''
      };

      this.listarAutores();
    });
  }

  excluir(id: number) {

  this.autorService.excluir(id).subscribe(() => {

    this.listarAutores();

  });

}
editar(autor: Autor) {

  this.autor = { ...autor };

  this.editando = true;

}
atualizar() {

  this.autorService.atualizar(this.autor.id, this.autor)
    .subscribe(() => {

      this.autor = {
        id: 0,
        nome: '',
        dataNascimento: '',
        nacionalidade: ''
      };

      this.editando = false;

      this.listarAutores();

    });

}
consultar() {

  this.autoresFiltrados = this.autores.filter(a =>

    a.nome.toLowerCase().includes(this.pesquisa.toLowerCase())

    ||

    a.id.toString().includes(this.pesquisa)

  );

}
}