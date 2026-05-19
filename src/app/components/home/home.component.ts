import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../services/dashboard.service';
import { Autor } from '../../models/autor';
import { Livro } from '../../models/livro';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  totalAutores = 0;
  totalLivros = 0;

  ultimosLivros: Livro[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard() {
    this.dashboardService.carregarDados().subscribe((dados: [Autor[], Livro[]]) => {

      const autores = dados[0];
      const livros = dados[1];

      this.totalAutores = autores.length;
      this.totalLivros = livros.length;

      this.ultimosLivros = livros.slice(-5).reverse();

    });
  }

}