import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ca-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cityId: string;
  @Input() showHumidity: boolean;
  @Input() showPressure: boolean;

  ngOnInit() {
    console.log(this.cityId);
  }
}
