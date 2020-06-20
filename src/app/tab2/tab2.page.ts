import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  load: boolean = false;
  textoBuscar: string = '';
  ideas:string[] = ['Spiderman', 'Matrix', 'Avenger', 'El origen', 'Dia de la independencia', 'Cars', 'Odisea 2001', 'Viaje al centro de la tierra', 'Parasitos'];
  peliculas: Pelicula[]= [];

  constructor(private movieService:MoviesService, private modalCtrl: ModalController) {}

  onSearchChange(event){
    this.load = true;
    const valor = event.detail.value;
    if(valor){
      setTimeout(() => {
        this.movieService.buscarPelicula(valor).subscribe(result => {
          this.peliculas = result['results'];
          this.load = false;
          console.log(this.peliculas);
        });
        
      }, 500);
    } else{
      this.peliculas = [];
      this.load = false;
      return;
    } 
  }

  onClick(idea){
    this.textoBuscar = idea;
  }

  async mostrarPelicula(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        id
      }
    });
    return await modal.present();
  }



}
