import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[]=[];
 
  slidesOpts = {
    slidesPerView: 1.3,
    freeMode: true
  }
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

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
