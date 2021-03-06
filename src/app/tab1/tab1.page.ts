import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[]= [];
  populares: Pelicula[]= [];

  constructor( private moviesService: MoviesService) {}

  ngOnInit(){
    this.moviesService.getFeature().subscribe(result => {
      this.peliculasRecientes = result.results;
    });
    this.getPopulares();
   
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.moviesService.getPopularity().subscribe(result => {
      const arrayTemp = [...this.populares, ...result.results]
      this.populares = arrayTemp;
    })
  }
}
  