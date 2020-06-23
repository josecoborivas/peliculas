import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[]=[];
  generos: Genre[]= [];
  favoritosGenero: any[] = [];
  constructor(private dataLocalService: DataLocalService, private moviesService: MoviesService) {}

  ionViewWillEnter(){
    this.cargarDatos();
  }

  async cargarDatos(){
   this.peliculas = await this.dataLocalService.cargarFavoritos();
   this.generos = await this.moviesService.cargarGeneros();
   this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritosGenero = [];
   generos.forEach(genero => {
     this.favoritosGenero.push({
       genero: genero.name,
       peliculas: peliculas.filter(peli => {
         return peli.genres.find(genre => genre.id === genero.id);
       })
     })
   });
  }
 
}
