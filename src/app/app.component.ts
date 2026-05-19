import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { AutoresComponent } from './components/autores/autores.component';

import { LivrosComponent } from './components/livros/livros.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    AutoresComponent,
    LivrosComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  tela = 'home';

  menuFechado = false;

  toggleMenu() {
    this.menuFechado = !this.menuFechado;
  }

}