import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { AutoresComponent } from './components/autores/autores.component';

import { LivrosComponent } from './components/livros/livros.component';

import { ClientesComponent } from './components/clientes/clientes.component';

import { LocacoesComponent } from './components/locacoes/locacoes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    AutoresComponent,
    LivrosComponent,
    ClientesComponent,
    LocacoesComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  tela = 'home';

  menuFechado = false;
  clienteFiltroLocacoes: number | string = 0;

  get tituloPagina(): string {
    const titulos: Record<string, string> = {
      home: 'Biblioteca',
      autores: 'Autores',
      livros: 'Livros',
      clientes: 'Clientes',
      locacoes: 'Locações'
    };

    return titulos[this.tela] || 'Biblioteca';
  }

  toggleMenu() {
    this.menuFechado = !this.menuFechado;
  }

  abrirLocacoesDoCliente(idCliente: number | string) {
    this.clienteFiltroLocacoes = idCliente;
    this.tela = 'locacoes';
  }

  @HostListener('window:abrirLocacoesCliente', ['$event'])
  receberPedidoLocacoes(evento: CustomEvent<number | string>) {
    this.abrirLocacoesDoCliente(evento.detail);
  }

}
