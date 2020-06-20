import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = URL + query;
    query += `&api_key=${ environment.apiKey }&language=es&include_image_language=es`;
    return this.http.get<T>( query );
  }

  getPopularity(){
    this.popularesPage ++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(){
   const hoy = new Date();
   const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
   let mes = hoy.getMonth() + 1;
   let mesString;
   if(mes < 10){
     mesString = '0' + mes;
   } else mesString = mes;
   
   const fInicio = `${hoy.getFullYear()}-${mesString}-01`;
   const fFin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;
   return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${fInicio}&primary_release_date.lte=${fFin}`);
  }

  getPeliculaDetalle(id: string){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?any=1&append_to_response=videos`)
  }

  getActoresPeliculas(id: string){
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?any=1`)
  }

  buscarPelicula(query){
    //return this.ejecutarQuery<RespuestaCredits>(`/search/movie?&query=${query}&include_adult=true`);
    return this.ejecutarQuery<RespuestaCredits>(`/search/movie?&query=${query}`);
  }
}
