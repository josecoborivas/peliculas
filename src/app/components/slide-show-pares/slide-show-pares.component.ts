import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slide-show-pares',
  templateUrl: './slide-show-pares.component.html',
  styleUrls: ['./slide-show-pares.component.scss'],
})
export class SlideShowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[]=[];
 
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -20
  }
  constructor() { }

  ngOnInit() {}

}
