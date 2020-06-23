import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

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
  };
  estado = '';
  
  constructor(
    private movieService:MoviesService,
    private modalCtrl: ModalController,
    private dataLocalService: DataLocalService,
    private youtube: YoutubeVideoPlayer) {
      
    }

  async ngOnInit() {

    const existe = await this.dataLocalService.existePelicula(this.id);
    if(existe) this.estado = 'star'; else this.estado = 'star-outline';

    this.movieService.getPeliculaDetalle(this.id).subscribe(result => {
      this.pelicula = result;
      console.log(this.pelicula)
    })

    this.movieService.getActoresPeliculas(this.id).subscribe(result => {
      this.actores = result.cast;
    })
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.dataLocalService.guardarPelicula(this.pelicula);
    setTimeout(() => {
      this.dataLocalService.existePelicula(this.id).then(result => {
        if(result) this.estado = 'star'; else this.estado = 'star-outline';
      })
    }, 500);
  }

  verTrailer(id){
    this.youtube.openVideo(id);
  }

  

}
