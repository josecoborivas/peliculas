import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[]= [];

  constructor(private storage: Storage) { }

  guardarPelicula(pelicula: PeliculaDetalle){
    const existe = this.peliculas.find(peli => peli.title === pelicula.title);
    if(!existe){
      this.peliculas.push(pelicula);
      this.storage.set('peliculas', this.peliculas);
    }
    
  }
}
