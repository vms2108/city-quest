import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cq-fake-card',
  templateUrl: './fake-card.component.html',
  styleUrls: ['./fake-card.component.scss']
})
export class FakeCardComponent implements OnInit {

  @Input()
  public block!: any;

  @Input()
  public header!: string;

  constructor() { }

  ngOnInit() {
  }

}
