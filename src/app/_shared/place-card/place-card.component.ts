import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../_models/place';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {

  @Input() places: Place[];
  constructor(
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

}
