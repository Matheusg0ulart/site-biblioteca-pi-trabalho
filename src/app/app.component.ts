import { Component } from '@angular/core';
import { AutoresComponent } from './components/autores/autores.component';
import { LivrosComponent } from './components/livros/livros.component';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule,AutoresComponent, LivrosComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  tela = 'autores';

}