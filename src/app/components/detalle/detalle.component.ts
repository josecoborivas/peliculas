import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[]=[];
  oculto = 150;

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }
  constructor(
    private movieService:MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.movieService.getPeliculaDetalle(this.id).subscribe(result => {
      console.log(result);
      this.pelicula = result;
    })

    this.movieService.getActoresPeliculas(this.id).subscribe(result => {
      console.log(result);
      this.actores = result.cast;
    })
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.dataLocalService.guardarPelicula(this.pelicula);
    this.mostrarToast();
  }

  async mostrarToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se agregó a tus favoritos!',
      duration: 2000
    });
    toast.present();
  }

}
