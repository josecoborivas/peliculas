import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slide-show-pares',
  templateUrl: './slide-show-pares.component.html',
  styleUrls: ['./slide-show-pares.component.scss'],
})
export class SlideShowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[]=[];
  @Output() cargarMas = new EventEmitter();
 
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -20
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

  onClick(){
    this.cargarMas.emit();
  }
}
