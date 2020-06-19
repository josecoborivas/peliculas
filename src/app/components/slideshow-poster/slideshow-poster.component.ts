import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[]=[];

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true
    //slidesPerColumn: 2,
    //slidesPerColumnFill: 'row'
  }
  constructor() { }

  ngOnInit() {}

}
